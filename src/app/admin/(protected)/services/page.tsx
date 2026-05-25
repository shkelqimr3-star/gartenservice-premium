import { deleteServiceAction, saveServiceAction } from "@/app/actions";
import { SubmitButton, TextAreaField, TextField } from "@/components/admin-fields";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const services = await getServices(true);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">CRUD</p>
      <h2 className="mt-2 text-4xl font-semibold text-[#17352a]">Leistungen bearbeiten</h2>
      <section className="mt-8 rounded-[8px] border border-[#dfd2bc] bg-white p-6">
        <h3 className="text-xl font-semibold">Neue Leistung</h3>
        <ServiceForm />
      </section>
      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)]">
            <ServiceForm service={service} />
            <form action={deleteServiceAction} className="mt-4">
              <input type="hidden" name="id" value={service.id} />
              <button className="text-sm font-semibold text-red-700">Leistung löschen</button>
            </form>
          </article>
        ))}
      </section>
    </div>
  );
}

function ServiceForm({
  service,
}: {
  service?: {
    id: string;
    title: string;
    description: string;
    priceNote?: string | null;
    icon?: string | null;
    order?: number | null;
    active?: boolean;
  };
}) {
  return (
    <form action={saveServiceAction} className="mt-5 grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={service?.id || ""} />
      <TextField label="Titel" name="title" defaultValue={service?.title} required />
      <TextField label="Icon (Leaf, Scissors, TreePine, Sprout, Truck)" name="icon" defaultValue={service?.icon || "Leaf"} />
      <TextField label="Preisnotiz" name="priceNote" defaultValue={service?.priceNote} />
      <TextField label="Sortierung" name="order" type="number" defaultValue={service?.order || 0} />
      <div className="md:col-span-2">
        <TextAreaField label="Beschreibung" name="description" defaultValue={service?.description} />
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-[#17352a]">
        <input type="checkbox" name="active" defaultChecked={service?.active ?? true} className="h-4 w-4" />
        Aktiv anzeigen
      </label>
      <div className="md:text-right">
        <SubmitButton />
      </div>
    </form>
  );
}
