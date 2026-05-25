import Link from "next/link";
import { BarChart3, BriefcaseBusiness, Images, Inbox, LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/app/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/services", label: "Leistungen", icon: BriefcaseBusiness },
  { href: "/admin/gallery", label: "Galerie", icon: Images },
  { href: "/admin/settings", label: "Einstellungen", icon: Settings },
  { href: "/admin/contacts", label: "Anfragen", icon: Inbox },
];

export function AdminNav() {
  return (
    <aside className="border-b border-white/10 bg-[#10251d] text-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c39a]">Admin Panel</p>
        <h1 className="mt-2 text-2xl font-semibold">Gartenservice</h1>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-w-max items-center gap-3 rounded-[8px] px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction} className="px-4 pb-5 lg:mt-auto">
        <button className="inline-flex w-full items-center gap-3 rounded-[8px] px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white">
          <LogOut className="h-4 w-4" />
          Abmelden
        </button>
      </form>
    </aside>
  );
}
