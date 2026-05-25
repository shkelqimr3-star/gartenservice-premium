import { updateContactStatusAction } from "@/app/actions";
import { getContactRequests } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ContactsAdminPage() {
  const contacts = await getContactRequests();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Website Formular</p>
      <h2 className="mt-2 text-4xl font-semibold text-[#17352a]">Kontaktanfragen</h2>
      <div className="mt-8 grid gap-4">
        {contacts.length === 0 ? (
          <div className="rounded-[8px] border border-[#dfd2bc] bg-white p-8 text-[#5e6c62]">
            Noch keine Anfragen vorhanden.
          </div>
        ) : null}
        {contacts.map((contact) => (
          <article key={contact.id} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)]">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6f42]">{contact.service || "Allgemeine Anfrage"}</p>
                <h3 className="mt-2 text-2xl font-semibold">{contact.name}</h3>
                <p className="mt-2 text-sm text-[#5e6c62]">{contact.phone} · {contact.email || "Keine E-Mail"}</p>
              </div>
              <form action={updateContactStatusAction} className="flex items-center gap-2">
                <input type="hidden" name="id" value={contact.id} />
                <select name="status" defaultValue={contact.status} className="h-10 rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-3 text-sm">
                  <option>Neu</option>
                  <option>Kontaktiert</option>
                  <option>Erledigt</option>
                </select>
                <button className="h-10 rounded-full bg-[#17352a] px-4 text-sm font-semibold text-white">Aktualisieren</button>
              </form>
            </div>
            <p className="mt-5 leading-7 text-[#405348]">{contact.message}</p>
            <p className="mt-4 text-xs text-[#8b6f42]">{new Date(contact.createdAt).toLocaleString("de-DE")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
