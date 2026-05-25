import { Leaf } from "lucide-react";
import { adminLoginAction } from "@/app/admin/login/actions";

export const runtime = "nodejs";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen bg-[#10251d] px-5 py-10 text-white lg:grid-cols-2">
      <section
        className="hidden items-end rounded-[8px] bg-cover bg-center p-10 lg:flex"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,37,29,.18),rgba(16,37,29,.78)),url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=85)",
        }}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c39a]">
            Gartenservice Gruenwert
          </p>
          <h1 className="mt-3 max-w-xl text-5xl font-semibold leading-tight">
            Adminbereich fuer Inhalte, Galerie und Anfragen.
          </h1>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <form
          action={adminLoginAction}
          className="w-full max-w-md rounded-[8px] border border-white/12 bg-white p-8 text-[#17352a] shadow-2xl"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17352a] text-[#d8c39a]">
            <Leaf className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold">Admin Login</h2>
          <p className="mt-2 text-sm text-[#5e6c62]">
            Melden Sie sich an, um Leistungen, Projekte und Firmendaten zu bearbeiten.
          </p>
          {params?.error ? (
            <div className="mt-5 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {params.error === "server"
                ? "Login derzeit nicht moeglich. Bitte pruefen Sie die Server-Konfiguration."
                : "Login fehlgeschlagen. Bitte pruefen Sie die Zugangsdaten."}
            </div>
          ) : null}
          <label className="mt-6 block text-sm font-semibold">
            E-Mail
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-2 h-12 w-full rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-4"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Passwort
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 h-12 w-full rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-4"
            />
          </label>
          <button className="mt-6 h-12 w-full rounded-full bg-[#17352a] font-semibold text-white transition hover:bg-[#234a3b]">
            Einloggen
          </button>
        </form>
      </section>
    </main>
  );
}
