import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Gartenservice Sami & Co.",
  description: "Impressum und Anbieterkennzeichnung von Gartenservice Sami & Co.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#f8f3ea] px-5 py-12 text-[#17352a] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-[#8b6f42] hover:text-[#17352a]">
          Zurueck zur Startseite
        </Link>
        <section className="mt-8 rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Anbieterkennzeichnung</p>
          <h1 className="mt-3 text-4xl font-semibold">Impressum</h1>

          <div className="mt-8 space-y-8 leading-7 text-[#405348]">
            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Angaben gemaess § 5 DDG</h2>
              <p className="mt-3">
                Gartenservice Sami & Co.
                <br />
                Etzwiesenstrasse 7
                <br />
                71522 Backnang
                <br />
                Deutschland
              </p>
              <p className="mt-3 text-sm font-semibold text-[#8b6f42]">
                TODO: Rechtsform/Inhaber exakt pruefen und ggf. ergaenzen, falls "Sami & Co." kein vollstaendiger
                rechtlicher Firmenname ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Kontakt</h2>
              <p className="mt-3">
                Telefon: <a href="tel:+4917641178833" className="font-semibold text-[#17352a]">+49 176 41178833</a>
                <br />
                WhatsApp: <a href="https://wa.me/4917641178833" className="font-semibold text-[#17352a]">+49 176 41178833</a>
                <br />
                E-Mail: <a href="mailto:hotis@outlook.de" className="font-semibold text-[#17352a]">hotis@outlook.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Vertretungsberechtigte Person</h2>
              <p className="mt-3">TODO: Vollstaendigen Namen der vertretungsberechtigten Person ergaenzen.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Umsatzsteuer</h2>
              <p className="mt-3">
                TODO: Umsatzsteuer-ID oder Hinweis zur Kleinunternehmerregelung nach § 19 UStG ergaenzen, falls
                zutreffend.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Verantwortlich fuer den Inhalt</h2>
              <p className="mt-3">
                Gartenservice Sami & Co., Etzwiesenstrasse 7, 71522 Backnang
                <br />
                TODO: Falls redaktionelle Inhalte im Sinne des § 18 Abs. 2 MStV angeboten werden, verantwortliche
                Person mit vollstaendigem Namen ergaenzen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">Hinweis</h2>
              <p className="mt-3">
                Diese Angaben wurden fuer den Domainstart vorbereitet. Rechtlich unsichere oder noch nicht bekannte
                Pflichtangaben sind mit TODO markiert und sollten vor Veroeffentlichung abschliessend geprueft werden.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
