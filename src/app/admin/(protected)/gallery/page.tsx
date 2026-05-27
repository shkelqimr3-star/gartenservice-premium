import { deleteProjectAction, saveProjectAction } from "@/app/actions";
import { SubmitButton, TextAreaField, TextField } from "@/components/admin-fields";
import { BlobImageUpload, UploadSubmitGuard } from "@/components/blob-image-upload";
import { SmartImage } from "@/components/smart-image";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ uploadError?: string }>;
}) {
  const params = await searchParams;
  const projects = await getProjects();
  const uploadError = params?.uploadError;

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Upload & CRUD</p>
      <h2 className="mt-2 text-4xl font-semibold text-[#17352a]">Projektgalerie</h2>
      {uploadError ? (
        <div className="mt-6 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Bild-Upload fehlgeschlagen. Bitte Format und Dateigroesse pruefen.
        </div>
      ) : null}
      <section className="mt-8 rounded-[8px] border border-[#dfd2bc] bg-white p-6">
        <h3 className="text-xl font-semibold">Neues Projekt</h3>
        <ProjectForm />
      </section>
      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)]">
            <div className="mb-5 grid grid-cols-2 gap-3">
              {project.beforeImage ? (
                <div className="relative h-32 overflow-hidden rounded-[8px]">
                  <SmartImage src={project.beforeImage} alt="" fill sizes="280px" className="object-cover" />
                </div>
              ) : <div className="h-32 rounded-[8px] bg-[#f8f3ea]" />}
              {project.afterImage ? (
                <div className="relative h-32 overflow-hidden rounded-[8px]">
                  <SmartImage src={project.afterImage} alt="" fill sizes="280px" className="object-cover" />
                </div>
              ) : <div className="h-32 rounded-[8px] bg-[#f8f3ea]" />}
            </div>
            <ProjectForm project={project} />
            <form action={deleteProjectAction} className="mt-4">
              <input type="hidden" name="id" value={project.id} />
              <button className="text-sm font-semibold text-red-700">Projekt löschen</button>
            </form>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProjectForm({
  project,
}: {
  project?: {
    id: string;
    title: string;
    location?: string | null;
    description: string;
    serviceType?: string | null;
    featured?: boolean;
    beforeImage?: string | null;
    afterImage?: string | null;
  };
}) {
  return (
    <form action={saveProjectAction} className="mt-5 grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={project?.id || ""} />
      <TextField label="Titel" name="title" defaultValue={project?.title} required />
      <TextField label="Ort" name="location" defaultValue={project?.location} />
      <TextField label="Leistungsart" name="serviceType" defaultValue={project?.serviceType} />
      <BlobImageUpload folder="projects" inputName="beforeImage" label="Vorher-Bild" existingUrl={project?.beforeImage} />
      <BlobImageUpload folder="projects" inputName="afterImage" label="Nachher-Bild" existingUrl={project?.afterImage} />
      <div className="md:col-span-2">
        <TextAreaField label="Beschreibung" name="description" defaultValue={project?.description} />
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-[#17352a]">
        <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className="h-4 w-4" />
        Hervorgehoben
      </label>
      <div className="md:text-right">
        <UploadSubmitGuard />
        <SubmitButton />
      </div>
    </form>
  );
}
