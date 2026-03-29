import { useEffect, useMemo, useState } from 'react';
import {
  FileImage,
  FileText,
  Loader,
  Megaphone,
  MessageSquare,
  PencilLine,
  Pin,
  Plus,
  Save,
  Trash2,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell, SectionCard } from '../components/ui';
import { uploadToCloudinary, type CloudinaryUploadResponse } from '../services/cloudinaryService';
import {
  createMessagePost,
  deleteMessagePost,
  subscribeToMessagePosts,
  updateMessagePinnedState,
  updateMessagePost,
  type MessageMedia,
  type MessagePostRecord,
} from '../services/messagePostsService';

type FormState = {
  title: string;
  category: string;
  summary: string;
  body: string;
  author: string;
  pinned: boolean;
};

const INITIAL_FORM: FormState = {
  title: '',
  category: 'Ministry update',
  summary: '',
  body: '',
  author: 'Practical Love Team',
  pinned: false,
};

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

function getFileKindLabel(resourceType: MessageMedia['resourceType'] | null) {
  if (resourceType === 'video') {
    return 'Video attached';
  }

  if (resourceType === 'image') {
    return 'Image attached';
  }

  return 'Optional media';
}

export default function AdminMessagesPage() {
  const [posts, setPosts] = useState<MessagePostRecord[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    'This admin page publishes to Firebase and uploads media to Cloudinary.'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [media, setMedia] = useState<MessageMedia | null>(null);

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handlePinnedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(current => ({ ...current, pinned: event.target.checked }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setMedia(null);
    setSelectedFileName('');
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
      };

      if (editingId) {
        await updateMessagePost(editingId, payload);
        setStatusMessage('Post updated in Firebase.');
      } else {
        await createMessagePost(payload);
        setStatusMessage('New post published to Firebase.');
      }

      resetForm();
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
    });
    setMedia(post.media);
    setSelectedFileName(post.media ? post.media.publicId : '');
    setStatusMessage(`Editing "${post.title}".`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessagePost(id);
      if (editingId === id) resetForm();
      setStatusMessage('Post deleted from Firebase.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to delete post.');
    }
  };

  const handleTogglePinned = async (post: MessagePostRecord) => {
    try {
      await updateMessagePinnedState(post.id, !post.pinned);
      setStatusMessage('Pin state updated.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to update pin state.');
    }
  };

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_50%,_#fff7ed_100%)]">
      <div className="space-y-8">
        <PageHero
          compact
          badge={
            <>
              <Megaphone className="h-4 w-4" />
              Admin Messages
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Logo className="h-7 w-7" />
            </div>
          }
          title="Admin page for posting feed messages"
          subtitle="Use this page to create, edit, pin, and delete public posts. The feed itself remains public at /messages."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#message-editor" className="btn-brand px-7 py-3">
                Add a post
              </a>
              <Link to="/admin/publications" className="btn-outline-brand px-7 py-3">
                Manage publications
              </Link>
              <Link to="/messages" className="btn-outline-brand px-7 py-3">
                View public feed
              </Link>
            </div>
          }
        />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionCard id="message-editor" className="border-red-100 bg-white/95 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Post editor
                </p>
                <h2 className="mt-2 text-3xl font-serif text-red-800">
                  {editingId ? 'Edit feed post' : 'Create a feed post'}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                {editingId ? <PencilLine className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
              </div>
            </div>

            <p className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700">
              {statusMessage}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-700">
                  Post title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Family Prayer Gathering This Sunday"
                  className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  >
                    <option>Ministry update</option>
                    <option>Announcement</option>
                    <option>Prayer focus</option>
                    <option>Teaching note</option>
                    <option>Event notice</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Author line
                  </label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Practical Love Team"
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="summary" className="mb-2 block text-sm font-semibold text-gray-700">
                  Short summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write the short version people should see first."
                  className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="body" className="mb-2 block text-sm font-semibold text-gray-700">
                  Full message
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={form.body}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Write the complete post here."
                  className="w-full resize-y rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="rounded-2xl border border-orange-100 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    {media?.resourceType === 'video' ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <FileImage className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {getFileKindLabel(media?.resourceType || null)}
                    </p>
                    <p className="text-sm text-gray-500">Add one image or video to this post.</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800">
                    {isUploading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload image or video'}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    {selectedFileName || media?.publicId || 'No file selected yet.'}
                  </p>
                </div>

                {media ? (
                  <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                    {media.resourceType === 'video' ? (
                      <video controls className="max-h-72 w-full rounded-2xl bg-black">
                        <source src={media.url} />
                      </video>
                    ) : (
                      <img
                        src={media.url}
                        alt="Uploaded media preview"
                        className="max-h-72 w-full rounded-2xl object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMedia(null);
                        setSelectedFileName('');
                      }}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove attached media
                    </button>
                  </div>
                ) : null}
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={handlePinnedChange}
                  className="h-4 w-4 rounded border-orange-300 text-red-700 focus:ring-red-500"
                />
                Pin this post so it stays above regular updates.
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : editingId ? (
                    <Save className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  {isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Publish post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-8 py-4 font-semibold text-orange-700 transition hover:bg-orange-50"
                >
                  Reset form
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard variant="gradient" className="border-orange-200 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Admin guide
            </p>
            <h2 className="mt-2 text-3xl font-serif text-red-800">What this page controls</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Write titles, summaries, and full ministry posts.
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Media</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Attach one Cloudinary-hosted image or video per post.
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <Pin className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Visibility</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Pin important posts and manage the public order shown on `/messages`.
                </p>
              </div>
            </div>
          </SectionCard>
        </section>

        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Manage posts
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">Current feed inventory</h2>
            </div>
            <p className="text-sm text-gray-500">
              {isLoading ? 'Loading posts...' : `${orderedPosts.length} post(s) available`}
            </p>
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-gray-700">
              <Loader className="h-5 w-5 animate-spin text-red-700" />
              Loading posts from Firebase...
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {orderedPosts.map(post => (
                <article
                  key={post.id}
                  className="rounded-[1.8rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98)_0%,_rgba(255,247,237,0.95)_100%)] p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                          {post.category}
                        </span>
                        {post.pinned ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                            <Pin className="h-3.5 w-3.5" />
                            Pinned
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-4 text-2xl font-serif text-gray-900">{post.title}</h3>
                      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
                        {post.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(post.createdAt)}</span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments.length} comment(s)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-50"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePinned(post)}
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                      >
                        <Pin className="h-4 w-4" />
                        {post.pinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
