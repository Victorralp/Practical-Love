import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  FileImage,
  FileText,
  Loader,
  PencilLine,
  Plus,
  Save,
  Search,
  Star,
  Upload,
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
import { uploadToCloudinary, type CloudinaryUploadResponse } from '../services/cloudinaryService';
import {
  createManagedPublication,
  deleteManagedPublication,
  subscribeToManagedPublications,
  updateManagedPublication,
  type ManagedPublicationRecord,
  type PublicationStatus,
} from '../services/publicationsService';

type PublicationFormState = {
  title: string;
  author: string;
  description: string;
  type: 'Book' | 'E-Book' | 'Audiobook';
  pageCount: string;
  status: PublicationStatus;
  featured: boolean;
};

type UploadedAsset = {
  url: string;
  publicId: string;
  format?: string;
  bytes?: number;
};

const INITIAL_FORM: PublicationFormState = {
  title: '',
  author: 'Practical Love Ministry',
  description: '',
  type: 'Book',
  pageCount: '',
  status: 'draft',
  featured: false,
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

function toUploadedAsset(result: CloudinaryUploadResponse): UploadedAsset {
  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    bytes: result.bytes,
  };
}

export default function AdminPublicationsPage() {
  const [publications, setPublications] = useState<ManagedPublicationRecord[]>([]);
  const [form, setForm] = useState<PublicationFormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [coverAsset, setCoverAsset] = useState<UploadedAsset | null>(null);
  const [pdfAsset, setPdfAsset] = useState<UploadedAsset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToManagedPublications(
      loadedPublications => {
        setPublications(loadedPublications);
        setIsLoading(false);
      },
      error => {
        setStatusMessage(`Unable to load publications: ${error.message}`);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const orderedPublications = useMemo(() => {
    let result = [...publications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [publications, searchQuery]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setCoverAsset(null);
    setPdfAsset(null);
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    setStatusMessage('Uploading publication cover...');

    try {
      const uploadResult = await uploadToCloudinary(file, {
        folder: 'publications/covers',
        tags: ['publications', 'cover-image'],
        resourceType: 'image',
      });

      setCoverAsset(toUploadedAsset(uploadResult));
      setStatusMessage('Cover image uploaded successfully.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Cover upload failed.');
    } finally {
      setIsUploadingCover(false);
      event.target.value = '';
    }
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingPdf(true);
    setStatusMessage('Uploading publication PDF...');

    try {
      const uploadResult = await uploadToCloudinary(file, {
        folder: 'publications/pdfs',
        tags: ['publications', 'pdf'],
        resourceType: 'raw',
      });

      setPdfAsset(toUploadedAsset(uploadResult));
      setStatusMessage('PDF uploaded successfully.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'PDF upload failed.');
    } finally {
      setIsUploadingPdf(false);
      event.target.value = '';
    }
  };

  const handleEdit = (publication: ManagedPublicationRecord) => {
    setEditingId(publication.id);
    setForm({
      title: publication.title,
      author: publication.author,
      description: publication.description,
      type: publication.type,
      pageCount: publication.pageCount ? String(publication.pageCount) : '',
      status: publication.status ?? 'draft',
      featured: publication.featured ?? false,
    });
    setCoverAsset(
      publication.coverImage && publication.coverPublicId
        ? { url: publication.coverImage, publicId: publication.coverPublicId }
        : null
    );
    setPdfAsset(
      publication.pdfUrl && publication.pdfPublicId
        ? { url: publication.pdfUrl, publicId: publication.pdfPublicId }
        : null
    );
    setStatusMessage(`Editing "${publication.title}".`);
    document.getElementById('publication-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteManagedPublication(id);
      if (editingId === id) {
        resetForm();
      }
      setStatusMessage('Publication deleted.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to delete publication.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanTitle = form.title.trim();
    const cleanAuthor = form.author.trim();
    const cleanDescription = form.description.trim();
    const parsedPageCount = form.pageCount.trim() ? Number(form.pageCount) : null;

    if (!cleanTitle || !cleanAuthor || !cleanDescription) {
      setStatusMessage('Title, author, and description are required.');
      return;
    }

    if (!pdfAsset?.url) {
      setStatusMessage('A PDF upload is required for each managed publication.');
      return;
    }

    if (parsedPageCount !== null && (!Number.isFinite(parsedPageCount) || parsedPageCount <= 0)) {
      setStatusMessage('Page count must be a positive number when provided.');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: cleanTitle,
        author: cleanAuthor,
        description: cleanDescription,
        type: form.type,
        coverImage: coverAsset?.url ?? null,
        coverPublicId: coverAsset?.publicId ?? null,
        pdfUrl: pdfAsset.url,
        pdfPublicId: pdfAsset.publicId,
        pageCount: parsedPageCount ? Math.round(parsedPageCount) : null,
        status: form.status,
        featured: form.featured,
      };

      if (editingId) {
        await updateManagedPublication(editingId, payload);
        setStatusMessage('Publication updated.');
      } else {
        await createManagedPublication(payload);
        setStatusMessage('Publication created.');
      }

      resetForm();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to save publication.');
    } finally {
      setIsSaving(false);
    }
  };

  const isBusy = isSaving || isUploadingCover || isUploadingPdf;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Publications"
        title="Books & PDFs"
        description="Publications with a PDF appear in the public catalog. Drafts stay hidden until published."
        icon={<BookOpen className="h-5 w-5" />}
        accentClassName="bg-orange-50 text-orange-600 ring-orange-100"
        meta={isLoading ? 'Loading...' : `${orderedPublications.length} of ${publications.length} shown`}
        actions={
          <>
            <a href="#publication-editor" className={adminButton.primary}>
              <Plus className="h-4 w-4" />
              New publication
            </a>
            <Link to="/publications" className={adminButton.secondary}>
              <ExternalLink className="h-4 w-4" />
              View public page
            </Link>
          </>
        }
      />

      {statusMessage ? (
        <StatusBanner message={statusMessage} onDismiss={() => setStatusMessage('')} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:items-start">
        {/* ── Editor ───────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-6">
          <AdminPanel
            id="publication-editor"
            eyebrow={editingId ? 'Editing' : 'New'}
            title={editingId ? 'Edit publication' : 'Create a publication'}
            icon={editingId ? <PencilLine className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            actions={
              editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm font-medium text-[#8a6552] hover:text-[#3d1d17] hover:underline"
                >
                  Cancel
                </button>
              ) : undefined
            }
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Title" htmlFor="title">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="The Practical Love Handbook"
                  className={controlClass}
                />
              </Field>

              <Field label="Author" htmlFor="author">
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Practical Love Ministry"
                  className={controlClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
                <Field label="Type" htmlFor="type">
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={controlClass}
                  >
                    <option>Book</option>
                    <option>E-Book</option>
                    <option>Audiobook</option>
                  </select>
                </Field>

                <Field label="Pages" htmlFor="pageCount" note="Optional">
                  <input
                    id="pageCount"
                    name="pageCount"
                    type="number"
                    min="1"
                    value={form.pageCount}
                    onChange={handleChange}
                    placeholder="24"
                    className={controlClass}
                  />
                </Field>
              </div>

              <Field label="Description" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What should readers expect from this publication?"
                  className={`${controlClass} resize-y`}
                />
              </Field>

              {/* Visibility */}
              <Field label="Visibility">
                <div className="flex gap-2">
                  {(['draft', 'published'] as const).map(value => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm(c => ({ ...c, status: value }))}
                      aria-pressed={form.status === value}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium capitalize transition ${
                        form.status === value
                          ? value === 'published'
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-amber-300 bg-amber-50 text-amber-800'
                          : 'border-[#e8d9cd] bg-white text-[#8a6552] hover:bg-[#fdf8f4]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </Field>

              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#e8d9cd] bg-white px-3.5 py-2.5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm(c => ({ ...c, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-[#e8d9cd] text-red-700 focus:ring-red-500"
                />
                <Star
                  className={`h-4 w-4 ${form.featured ? 'fill-amber-400 text-amber-400' : 'text-[#bda392]'}`}
                />
                <span className="text-sm text-[#5c3a2b]">Feature on the public page</span>
              </label>

              {/* Cover */}
              <div className="rounded-xl border border-[#f0e2d8] bg-[#fdfaf7] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#3d1d17]">
                    <FileImage className="h-4 w-4 text-[#a8735c]" />
                    Cover image
                    <span className="text-xs font-normal text-[#a8735c]">Optional</span>
                  </div>
                  <label className={`${adminButton.secondary} cursor-pointer`}>
                    {isUploadingCover ? (
                      <Loader className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    {isUploadingCover ? 'Uploading' : coverAsset ? 'Replace' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      disabled={isUploadingCover}
                    />
                  </label>
                </div>

                {coverAsset && (
                  <div className="mt-3 flex items-start gap-3">
                    <img
                      src={coverAsset.url}
                      alt="Publication cover preview"
                      className="h-24 w-20 shrink-0 rounded-lg border border-[#f0e2d8] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverAsset(null)}
                      className={adminButton.ghost}
                    >
                      <X className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* PDF */}
              <div className="rounded-xl border border-[#f0e2d8] bg-[#fdfaf7] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#3d1d17]">
                    <FileText className="h-4 w-4 text-[#a8735c]" />
                    PDF file
                    <span className="text-xs font-normal text-red-600">Required</span>
                  </div>
                  <label className={`${adminButton.secondary} cursor-pointer`}>
                    {isUploadingPdf ? (
                      <Loader className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    {isUploadingPdf ? 'Uploading' : pdfAsset ? 'Replace' : 'Upload'}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                      disabled={isUploadingPdf}
                    />
                  </label>
                </div>

                {pdfAsset && (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="min-w-0 truncate text-xs text-[#8a6552]" title={pdfAsset.publicId}>
                      {pdfAsset.publicId}
                    </p>
                    <a
                      href={pdfAsset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-red-700 hover:underline"
                    >
                      Open
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={isBusy} className={adminButton.primary}>
                  {isSaving ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Create publication'}
                </button>
                <button type="button" onClick={resetForm} className={adminButton.secondary}>
                  Reset
                </button>
              </div>
            </form>
          </AdminPanel>
        </div>

        {/* ── List ─────────────────────────────────────────────────── */}
        <AdminPanel
          eyebrow="Catalog"
          title="Publications"
          actions={
            <div className="relative w-48">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bda392]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search publications"
                className={`${controlClass} pl-9`}
              />
            </div>
          }
          flush
        >
          {isLoading ? (
            <LoadingState label="Loading publications..." className="m-5" />
          ) : orderedPublications.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-5 w-5" />}
              title={searchQuery ? 'Nothing matches this search' : 'No publications yet'}
              description={
                searchQuery
                  ? 'Try another title or author.'
                  : 'Create one with the editor to add it to the public catalog.'
              }
              className="m-5"
            />
          ) : (
            <ul className="divide-y divide-[#f6ece4]">
              {orderedPublications.map(publication => (
                <li
                  key={publication.id}
                  className={`px-5 py-4 transition hover:bg-[#fdfaf7] ${
                    editingId === publication.id ? 'bg-[#fdf3ec]' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    {publication.coverImage ? (
                      <img
                        src={publication.coverImage}
                        alt=""
                        className="h-20 w-14 shrink-0 rounded-lg border border-[#f0e2d8] object-cover"
                      />
                    ) : (
                      <span className="flex h-20 w-14 shrink-0 items-center justify-center rounded-lg border border-[#f0e2d8] bg-[#fdf3ec] text-[#bda392]">
                        <BookOpen className="h-5 w-5" />
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${
                            publication.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {publication.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                        <span className="rounded-md bg-[#fdf3ec] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#a8735c]">
                          {publication.type}
                        </span>
                        {publication.featured && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-amber-700">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            Featured
                          </span>
                        )}
                        {publication.pageCount ? (
                          <span className="rounded-md bg-[#f4ede8] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8a6552]">
                            {publication.pageCount} pages
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-2 font-semibold text-[#3d1d17]">{publication.title}</h3>
                      <p className="mt-0.5 text-xs text-[#a8735c]">
                        {publication.author} · {formatDate(publication.createdAt)}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5c3a2b]">
                        {publication.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(publication)}
                          className={adminButton.secondary}
                        >
                          <PencilLine className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        {publication.pdfUrl && (
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={adminButton.subtle}
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Open PDF
                          </a>
                        )}
                        <ConfirmButton onConfirm={() => handleDelete(publication.id)} />
                      </div>
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
