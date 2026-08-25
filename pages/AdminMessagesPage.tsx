import { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  FileImage,
  Loader,
  Megaphone,
  MessageSquare,
  PencilLine,
  Pin,
  PinOff,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AdminPageHeader,
  AdminPanel,
  ConfirmButton,
  EmptyState,
  Field,
  LoadingState,
  StatusBanner,
  adminButton,
  controlClass,
} from '../components/admin';
import {
  deleteFromCloudinary,
  uploadToCloudinary,
  type CloudinaryUploadResponse,
} from '../services/cloudinaryService';
import {
  createMessagePost,
  deleteMessagePost,
  subscribeToMessagePosts,
  updateMessagePinnedState,
  updateMessagePost,
  type MessageMedia,
  type MessagePostRecord,
} from '../services/messagePostsService';
import VideoProviderBadge from '../components/VideoProviderBadge';

type FormState = {
  title: string;
  category: string;
  summary: string;
  body: string;
  author: string;
  pinned: boolean;
  youtubeUrl: string;
};

const INITIAL_FORM: FormState = {
  title: '',
  category: 'Ministry update',
  summary: '',
  body: '',
  author: 'Practical Love Team',
  pinned: false,
  youtubeUrl: '',
};

const CATEGORIES = [
  'Ministry update',
  'Announcement',
  'Prayer focus',
  'Teaching note',
  'Event notice',
] as const;

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

function toMediaPayload(result: CloudinaryUploadResponse): MessageMedia {
  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type === 'video' ? 'video' : 'image',
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

/** Best-effort Cloudinary cleanup — failures are logged, never block the UI. */
function cleanupCloudinaryMedia(target: MessageMedia | null | undefined) {
  if (!target) return;

  deleteFromCloudinary(target.publicId, target.resourceType).catch(() => {
    console.warn(
      `Could not delete Cloudinary asset "${target.publicId}" — remove it manually if it is no longer needed.`
    );
  });
}

const MAX_TITLE_LENGTH = 120;
const MAX_SUMMARY_LENGTH = 280;
const MAX_BODY_LENGTH = 10000;
const MAX_AUTHOR_LENGTH = 80;
const MAX_URL_LENGTH = 2048;

/** True when the editor still matches its pristine "new post" state. */
function isBlankForm(form: FormState, media: MessageMedia | null) {
  return (
    form.title === INITIAL_FORM.title &&
    form.category === INITIAL_FORM.category &&
    form.summary === INITIAL_FORM.summary &&
    form.body === INITIAL_FORM.body &&
    form.author === INITIAL_FORM.author &&
    form.pinned === INITIAL_FORM.pinned &&
    form.youtubeUrl === INITIAL_FORM.youtubeUrl &&
    !media
  );
}

export default function AdminMessagesPage() {
  const [posts, setPosts] = useState<MessagePostRecord[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [media, setMedia] = useState<MessageMedia | null>(null);
  // Media detached from the form during this editing session. It is only
  // deleted from Cloudinary once the change is actually saved (or the editor
  // is discarded in "new post" mode), so "Cancel edit" never breaks a live post.
  const [detachedMedia, setDetachedMedia] = useState<MessageMedia[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMessagePosts(
      loadedPosts => {
        setPosts(loadedPosts);
        setIsLoading(false);
      },
      error => {
        setStatusMessage(`Unable to load posts: ${error.message}`);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const orderedPosts = useMemo(
    () =>
      [...posts].sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [posts]
  );

  const isFormDirty = !isBlankForm(form, media);

  // Warn before closing/reloading the tab with unsaved editor content.
  useEffect(() => {
    if (!isFormDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFormDirty]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const queueDetachedMedia = (target: MessageMedia | null | undefined) => {
    if (!target) return;
    setDetachedMedia(current => [...current, target]);
  };

  const applyReset = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setMedia(null);
    setSelectedFileName('');
    setStatusMessage('');
    setDetachedMedia([]);
  };

  /** Reset used by UI buttons — asks first when there are unsaved changes. */
  const resetForm = () => {
    if (
      isFormDirty &&
      !window.confirm(
        editingId
          ? 'Discard the changes to this post? Its current media will be kept.'
          : 'Discard the changes in this form?'
      )
    ) {
      return;
    }

    // Discarding an unsaved new post leaves its freshly uploaded media
    // unreferenced — clean those up now.
    if (!editingId) {
      detachedMedia.forEach(cleanupCloudinaryMedia);
    }

    applyReset();
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage('Uploading media to Cloudinary...');
    setSelectedFileName(file.name);

    try {
      const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
      const uploadResult = await uploadToCloudinary(file, {
        folder: 'messages/feed',
        tags: ['messages', 'ministry-feed', resourceType],
        resourceType,
      });

      queueDetachedMedia(media);
      setMedia(toMediaPayload(uploadResult));
      setStatusMessage(`${resourceType === 'video' ? 'Video' : 'Image'} uploaded successfully.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Media upload failed.');
      setSelectedFileName('');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanTitle = form.title.trim();
    const cleanSummary = form.summary.trim();
    const cleanBody = form.body.trim();
    const cleanAuthor = form.author.trim() || 'Practical Love Team';
    const cleanCategory = form.category.trim() || 'Ministry update';

    if (!cleanTitle || !cleanSummary || !cleanBody) {
      setStatusMessage('Title, summary, and full message are required.');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: cleanTitle,
        category: cleanCategory,
        summary: cleanSummary,
        body: cleanBody,
        author: cleanAuthor,
        pinned: form.pinned,
        media,
        youtubeUrl: form.youtubeUrl.trim() || null,
      };

      if (editingId) {
        await updateMessagePost(editingId, payload);
        setStatusMessage('Post updated.');
      } else {
        await createMessagePost(payload);
        setStatusMessage('New post published to the feed.');
      }

      detachedMedia.forEach(cleanupCloudinaryMedia);
      applyReset();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to save post.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (post: MessagePostRecord) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      category: post.category,
      summary: post.summary,
      body: post.body,
      author: post.author,
      pinned: post.pinned,
      youtubeUrl: post.youtubeUrl || '',
    });
    setMedia(post.media);
    setSelectedFileName(post.media ? post.media.publicId : '');
    setStatusMessage(`Editing "${post.title}".`);

    document.getElementById('message-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessagePost(id);
      cleanupCloudinaryMedia(posts.find(post => post.id === id)?.media);

      if (editingId === id) {
        detachedMedia.forEach(cleanupCloudinaryMedia);
        applyReset();
      }

      setStatusMessage('Post deleted.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to delete post.');
    }
  };

  const handleTogglePinned = async (post: MessagePostRecord) => {
    try {
      await updateMessagePinnedState(post.id, !post.pinned);
      setStatusMessage(post.pinned ? 'Post unpinned.' : 'Post pinned to the top of the feed.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to update pin state.');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Messages"
        title="Feed posts"
        description="Create, edit, pin, and remove the posts shown on the public messages feed."
        icon={<Megaphone className="h-5 w-5" />}
        actions={
          <>
            <a href="#message-editor" className={adminButton.primary}>
              <Plus className="h-4 w-4" />
              New post
            </a>
            <Link to="/messages" className={adminButton.secondary}>
              <ExternalLink className="h-4 w-4" />
              View public feed
            </Link>
          </>
        }
        meta={isLoading ? 'Loading posts...' : `${orderedPosts.length} post(s) live`}
      />

      {statusMessage ? (
        <StatusBanner message={statusMessage} onDismiss={() => setStatusMessage('')} />
      ) : null}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]">
        {/* ── Editor ─────────────────────────────────────────────────── */}
        <AdminPanel
          id="message-editor"
          eyebrow={editingId ? 'Editing' : 'New post'}
          title={editingId ? 'Edit feed post' : 'Create a feed post'}
          icon={editingId ? <PencilLine className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          className="lg:sticky lg:top-6"
          actions={
            editingId ? (
              <button type="button" onClick={resetForm} className={adminButton.subtle}>
                <X className="h-3.5 w-3.5" />
                Cancel edit
              </button>
            ) : null
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Post title" htmlFor="title">
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                maxLength={MAX_TITLE_LENGTH}
                placeholder="Family Prayer Gathering This Sunday"
                className={controlClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" htmlFor="category">
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={controlClass}
                >
                  {CATEGORIES.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </Field>

              <Field label="Author line" htmlFor="author">
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  maxLength={MAX_AUTHOR_LENGTH}
                  placeholder="Practical Love Team"
                  className={controlClass}
                />
              </Field>
            </div>

            <Field
              label="Short summary"
              htmlFor="summary"
              hint={`Shown first on the feed card. Max ${MAX_SUMMARY_LENGTH} characters.`}
            >
              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={3}
                maxLength={MAX_SUMMARY_LENGTH}
                placeholder="The short version people should see first."
                className={`${controlClass} resize-none`}
              />
            </Field>

            <Field label="Full message" htmlFor="body">
              <textarea
                id="body"
                name="body"
                value={form.body}
                onChange={handleChange}
                rows={9}
                maxLength={MAX_BODY_LENGTH}
                placeholder="Write the complete post here."
                className={`${controlClass} resize-y`}
              />
            </Field>

            <Field
              label="Video link"
              htmlFor="youtubeUrl"
              note="Optional — YouTube, Facebook (video, photo, or post), Vimeo, TikTok, or Instagram"
            >
              <input
                id="youtubeUrl"
                name="youtubeUrl"
                type="url"
                value={form.youtubeUrl}
                onChange={handleChange}
                maxLength={MAX_URL_LENGTH}
                placeholder="https://www.youtube.com/watch?v=..."
                className={controlClass}
              />
            </Field>

            {/* ── Media ────────────────────────────────────────────── */}
            <div className="rounded-xl border border-[#f0e2d8] bg-[#fdfaf7] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#a8735c] ring-1 ring-[#f0e2d8]">
                    {media?.resourceType === 'video' ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <FileImage className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#3d1d17]">Media</p>
                    <p className="truncate text-xs text-[#8a6552]">
                      {selectedFileName || media?.publicId || 'One image or video, optional.'}
                    </p>
                  </div>
                </div>

                <label
                  className={`${adminButton.secondary} shrink-0 cursor-pointer px-3 py-2 text-xs`}
                >
                  {isUploading ? (
                    <Loader className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  {isUploading ? 'Uploading' : media ? 'Replace' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {media ? (
                <div className="mt-3">
                  {media.resourceType === 'video' ? (
                    <video controls className="max-h-56 w-full rounded-lg bg-black">
                      <source src={media.url} />
                    </video>
                  ) : (
                    <img
                      src={media.url}
                      alt="Attached media preview"
                      className="max-h-56 w-full rounded-lg object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      queueDetachedMedia(media);
                      setMedia(null);
                      setSelectedFileName('');
                    }}
                    className={`${adminButton.danger} mt-2`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove media
                  </button>
                </div>
              ) : null}
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#f0e2d8] bg-[#fdfaf7] px-4 py-3">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={event => setForm(current => ({ ...current, pinned: event.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-[#d9c3b4] text-red-700 focus:ring-red-500"
              />
              <span className="text-sm text-[#5c3a2b]">
                Pin this post
                <span className="mt-0.5 block text-xs text-[#8a6552]">
                  Pinned posts stay above regular updates on /messages.
                </span>
              </span>
            </label>

            <div className="flex flex-col gap-2 border-t border-[#f6ece4] pt-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className={`${adminButton.primary} flex-1`}
              >
                {isSaving ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : editingId ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Publish post'}
              </button>
              <button type="button" onClick={resetForm} className={adminButton.secondary}>
                Reset
              </button>
            </div>
          </form>
        </AdminPanel>

        {/* ── Existing posts ─────────────────────────────────────────── */}
        <AdminPanel
          eyebrow="Feed"
          title="Published posts"
          description="Newest first, pinned posts on top."
          flush
        >
          {isLoading ? (
            <LoadingState label="Loading posts..." className="m-5" />
          ) : orderedPosts.length === 0 ? (
            <EmptyState
              icon={<Megaphone className="h-5 w-5" />}
              title="No posts yet"
              description="Publish your first post from the editor and it appears on the public feed straight away."
              className="m-5"
            />
          ) : (
            <ul className="divide-y divide-[#f6ece4]">
              {orderedPosts.map(post => (
                <li
                  key={post.id}
                  className={`px-5 py-4 transition hover:bg-[#fdfaf7] ${
                    editingId === post.id ? 'bg-[#fdf3ec]' : ''
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-md bg-[#fdf3ec] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#a8735c]">
                          {post.category}
                        </span>
                        {post.pinned ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-amber-700">
                            <Pin className="h-3 w-3" />
                            Pinned
                          </span>
                        ) : null}
                        <VideoProviderBadge url={post.youtubeUrl} size="sm" />
                      </div>

                      <h3 className="mt-2 text-base font-semibold text-[#3d1d17]">{post.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#6e4737]">
                        {post.summary}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#a8735c]">
                        <span>{formatDate(post.createdAt)}</span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {post.comments.length}
                        </span>
                        <span>{post.author}</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        className={adminButton.subtle}
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePinned(post)}
                        className={adminButton.subtle}
                      >
                        {post.pinned ? (
                          <PinOff className="h-3.5 w-3.5" />
                        ) : (
                          <Pin className="h-3.5 w-3.5" />
                        )}
                        {post.pinned ? 'Unpin' : 'Pin'}
                      </button>
                      <ConfirmButton onConfirm={() => handleDelete(post.id)} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminPanel>
      </div>
    </div>
  );
}
