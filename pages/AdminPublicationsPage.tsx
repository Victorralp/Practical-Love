import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  FileImage,
  FileText,
  Loader,
  PencilLine,
  Plus,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell, SectionCard } from '../components/ui';
import { uploadToCloudinary, type CloudinaryUploadResponse } from '../services/cloudinaryService';
import {
  createManagedPublication,
  deleteManagedPublication,
  subscribeToManagedPublications,
  updateManagedPublication,
  type ManagedPublicationRecord,
} from '../services/publicationsService';

type PublicationFormState = {
  title: string;
  author: string;
  description: string;
  type: 'Book' | 'E-Book' | 'Audiobook';
  pageCount: string;
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
  const [statusMessage, setStatusMessage] = useState(
    'Upload cover images and PDFs for publications from this admin page.'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [coverAsset, setCoverAsset] = useState<UploadedAsset | null>(null);
  const [pdfAsset, setPdfAsset] = useState<UploadedAsset | null>(null);

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

  const orderedPublications = useMemo(
    () =>
      [...publications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [publications]
  );

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

  return (
    <PageShell className="bg-[radial-gradient(circle_at_top_left,_rgba(254,215,170,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.16),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_50%,_#fff7ed_100%)]">
      <div className="space-y-8">
        <PageHero
          compact
          badge={
            <>
              <BookOpen className="h-4 w-4" />
              Admin Publications
            </>
          }
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
              <Logo className="h-7 w-7" />
            </div>
          }
          title="Admin page for publication uploads"
          subtitle="Create publication entries with a cover image and PDF so they appear in the public publications catalog."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#publication-editor" className="btn-brand px-7 py-3">
                Add publication
              </a>
              <Link to="/publications" className="btn-outline-brand px-7 py-3">
                View public publications
              </Link>
            </div>
          }
        />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionCard id="publication-editor" className="border-red-100 bg-white/95 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Publication editor
                </p>
                <h2 className="mt-2 text-3xl font-serif text-red-800">
                  {editingId ? 'Edit publication' : 'Create a publication'}
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
                  Publication title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: The Practical Love Handbook"
                  className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Author
                  </label>
                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Practical Love Ministry"
                    className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-[1fr_0.8fr]">
                  <div>
                    <label
                      htmlFor="type"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    >
                      <option>Book</option>
                      <option>E-Book</option>
                      <option>Audiobook</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pageCount"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Pages
                    </label>
                    <input
                      id="pageCount"
                      name="pageCount"
                      type="number"
                      min="1"
                      value={form.pageCount}
                      onChange={handleChange}
                      placeholder="24"
                      className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the publication and what readers should expect."
                  className="w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-orange-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                      <FileImage className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cover image</p>
                      <p className="text-sm text-gray-500">
                        Optional visual for the publication card.
                      </p>
                    </div>
                  </div>

                  <label className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800">
                    {isUploadingCover ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    {isUploadingCover ? 'Uploading...' : 'Upload cover'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      disabled={isUploadingCover}
                    />
                  </label>

                  {coverAsset ? (
                    <div className="mt-4 space-y-3">
                      <img
                        src={coverAsset.url}
                        alt="Publication cover preview"
                        className="h-44 w-full rounded-2xl object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverAsset(null)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove cover
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-orange-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">PDF file</p>
                      <p className="text-sm text-gray-500">
                        Required. This is what readers will open.
                      </p>
                    </div>
                  </div>

                  <label className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800">
                    {isUploadingPdf ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    {isUploadingPdf ? 'Uploading...' : 'Upload PDF'}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                      disabled={isUploadingPdf}
                    />
                  </label>

                  {pdfAsset ? (
                    <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                      <p className="text-sm font-medium text-gray-900">{pdfAsset.publicId}</p>
                      <a
                        href={pdfAsset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-100"
                      >
                        <BookOpen className="h-4 w-4" />
                        Open uploaded PDF
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSaving || isUploadingCover || isUploadingPdf}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : editingId ? (
                    <Save className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  {isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Create publication'}
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
            <h2 className="mt-2 text-3xl font-serif text-red-800">
              How uploaded publications work
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <FileImage className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Cover</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Upload an optional cover image to improve the publication card on the public page.
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">PDF</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Upload the book or booklet PDF. Public readers will be able to open and download
                  it.
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-5">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-red-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Catalog</h3>
                </div>
                <p className="mt-3 leading-7 text-gray-700">
                  Uploaded publications are merged into the existing publications page without
                  removing the current built-in titles.
                </p>
              </div>
            </div>
          </SectionCard>
        </section>

        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Manage uploads
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">Current admin publications</h2>
            </div>
            <p className="text-sm text-gray-500">
              {isLoading
                ? 'Loading publications...'
                : `${orderedPublications.length} publication(s) uploaded`}
            </p>
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-gray-700">
              <Loader className="h-5 w-5 animate-spin text-red-700" />
              Loading publications from Firebase...
            </div>
          ) : orderedPublications.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-10 text-center text-gray-700">
              No admin-uploaded publications yet.
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {orderedPublications.map(publication => (
                <article
                  key={publication.id}
                  className="rounded-[1.8rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98)_0%,_rgba(255,247,237,0.95)_100%)] p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                          {publication.type}
                        </span>
                        {publication.pageCount ? (
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
                            {publication.pageCount} pages
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-4 text-2xl font-serif text-gray-900">
                        {publication.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">{publication.author}</p>
                      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
                        {publication.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(publication.createdAt)}</span>
                        {publication.pdfUrl ? (
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-orange-700 underline"
                          >
                            Open PDF
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(publication)}
                        className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-50"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(publication.id)}
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
