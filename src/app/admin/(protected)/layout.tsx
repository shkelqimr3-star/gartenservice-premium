import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-[#f8f3ea] lg:flex">
      <AdminNav />
      <section className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</section>
    </main>
  );
}
