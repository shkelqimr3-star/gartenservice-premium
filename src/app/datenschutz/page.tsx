import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz | Gartenservice Sami & Co.",
  description: "Datenschutzhinweise fuer die Website von Gartenservice Sami & Co.",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#f8f3ea] px-5 py-12 text-[#17352a] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-[#8b6f42] hover:text-[#17352a]">
          Zurueck zur Startseite
        </Link>
        <section className="mt-8 rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Datenschutzhinweise</p>
          <h1 className="mt-3 text-4xl font-semibold">Datenschutzerklaerung</h1>

          <div className="mt-8 space-y-8 leading-7 text-[#405348]">
            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">1. Verantwortlicher</h2>
              <p className="mt-3">
                Gartenservice Sami & Co.
                <br />
                Etzwiesenstrasse 7
                <br />
                71522 Backnang
                <br />
                Telefon: +49 176 41178833
                <br />
                E-Mail: hotis@outlook.de
              </p>
              <p className="mt-3 text-sm font-semibold text-[#8b6f42]">
                TODO: Vollstaendige verantwortliche Person/Rechtsform final pruefen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">2. Kontaktformular und gespeicherte Anfragen</h2>
              <p className="mt-3">
                Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen eingetragenen Daten, insbesondere
                Name, Telefonnummer, E-Mail-Adresse, ausgewaehlte Leistung und Nachricht. Die Angaben werden genutzt,
                um Ihre Anfrage zu beantworten, Angebote vorzubereiten und Rueckfragen zu klaeren.
              </p>
              <p className="mt-3">
                Kontaktanfragen werden im Administrationsbereich der Website gespeichert, damit Anfragen nachvollzogen
                und bearbeitet werden koennen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf
                einen Auftrag oder ein Angebot gerichtet ist, sowie Art. 6 Abs. 1 lit. f DSGVO fuer die geordnete
                Bearbeitung eingehender Anfragen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">3. Kontakt per Telefon, E-Mail und WhatsApp</h2>
              <p className="mt-3">
                Wenn Sie uns telefonisch, per E-Mail oder ueber WhatsApp kontaktieren, verarbeiten wir die von Ihnen
                mitgeteilten Kontaktdaten und Inhalte zur Bearbeitung Ihrer Anfrage. Bei WhatsApp gelten zusaetzlich
                die Datenschutzbedingungen des jeweiligen Dienstanbieters. Bitte senden Sie keine besonders sensiblen
                Daten ueber WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">4. Hosting bei Vercel</h2>
              <p className="mt-3">
                Diese Website wird ueber Vercel bereitgestellt. Beim Aufruf der Website koennen technische Zugriffsdaten
                verarbeitet werden, zum Beispiel IP-Adresse, Datum und Uhrzeit des Abrufs, Browserinformationen,
                angeforderte Seiten und technische Logdaten. Die Verarbeitung dient der sicheren und stabilen
                Bereitstellung der Website.
              </p>
              <p className="mt-3">
                TODO: Vercel-Auftragsverarbeitungsvertrag, konkrete Region/Datentransfers und eingesetzte Vercel
                Dienste im Vercel-Konto pruefen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">5. Datenbankhosting bei Neon PostgreSQL</h2>
              <p className="mt-3">
                Kontaktanfragen, Website-Einstellungen, Leistungsdaten und Galerieinhalte werden in einer PostgreSQL
                Datenbank bei Neon gespeichert. Die Datenbank dient dem Betrieb des Kontaktformulars und des
                Administrationsbereichs.
              </p>
              <p className="mt-3">
                TODO: Neon-Auftragsverarbeitungsvertrag, konkrete Speicherregion und moegliche Drittlanduebermittlungen
                im Neon-Konto pruefen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">6. Bild-Uploads und Admin-Inhalte</h2>
              <p className="mt-3">
                Im geschuetzten Administrationsbereich koennen Bilder und Projektinhalte hochgeladen oder bearbeitet
                werden. Diese Inhalte werden zur Darstellung der Website und zur Pflege der Projektgalerie verarbeitet.
                Bitte laden Sie nur Bilder hoch, an denen die erforderlichen Rechte bestehen und auf denen Personen nur
                mit entsprechender Erlaubnis erkennbar sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">7. Speicherdauer</h2>
              <p className="mt-3">
                Personenbezogene Daten werden nur so lange gespeichert, wie dies fuer die Bearbeitung Ihrer Anfrage,
                gesetzliche Aufbewahrungspflichten oder berechtigte Interessen erforderlich ist. Kontaktanfragen koennen
                im Adminbereich geloescht oder als erledigt markiert werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">8. Ihre Rechte</h2>
              <p className="mt-3">
                Sie haben nach Massgabe der DSGVO Rechte auf Auskunft, Berichtigung, Loeschung, Einschraenkung der
                Verarbeitung, Datenuebertragbarkeit und Widerspruch. Ausserdem koennen Sie sich bei einer
                Datenschutzaufsichtsbehoerde beschweren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#17352a]">9. Stand</h2>
              <p className="mt-3">
                Stand: Mai 2026. Diese Datenschutzerklaerung sollte vor dem Domainstart final rechtlich geprueft werden,
                insbesondere hinsichtlich Vercel, Neon, WhatsApp und der konkreten Unternehmensangaben.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
