import { BriefcaseBusiness, Images, Inbox, Settings } from "lucide-react";
import Link from "next/link";
import { getBusinessSettings, getContactRequests, getProjects, getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [settings, services, projects, contacts] = await Promise.all([
    getBusinessSettings(),
    getServices(true),
    getProjects(),
    getContactRequests(),
  ]);

  const cards = [
    { label: "Leistungen", value: services.length, href: "/admin/services", icon: BriefcaseBusiness },
    { label: "Projekte", value: projects.length, href: "/admin/gallery", icon: Images },
    { label: "Anfragen", value: contacts.length, href: "/admin/contacts", icon: Inbox },
    { label: "Firmendaten", value: "Live", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Dashboard</p>
      <h2 className="mt-2 text-4xl font-semibold text-[#17352a]">{settings.companyName}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)] transition hover:-translate-y-0.5">
            <Icon className="h-6 w-6 text-[#8b6f42]" />
            <p className="mt-5 text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-[#5e6c62]">{label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-[8px] border border-[#dfd2bc] bg-white p-6">
        <h3 className="text-xl font-semibold">Nächste Schritte</h3>
        <p className="mt-3 max-w-3xl leading-7 text-[#5e6c62]">
          Pflegen Sie Leistungen, laden Sie Vorher/Nachher-Bilder hoch, aktualisieren Sie Hero-Text und Kontaktdaten und bearbeiten Sie neue Website-Anfragen.
        </p>
      </div>
    </div>
  );
}
