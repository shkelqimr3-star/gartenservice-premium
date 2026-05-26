import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Clock, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { submitContactRequest } from "@/app/actions";
import { ServiceIcon } from "@/components/icons";
import { SmartImage } from "@/components/smart-image";
import { getBusinessSettings, getProjects, getServices } from "@/lib/data";
import { businessInfo, seoKeywords, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Gartenservice Backnang | Gartenpflege, Hecken & Rasen",
  description:
    "Gartenservice Sami & Co. in Backnang: Gartenpflege, Hecke schneiden, Rasen maehen, Baeume faellen und Gruenschnitt-Abtransport in Backnang und Umgebung.",
  keywords: seoKeywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Gartenservice Backnang | Gartenservice Sami & Co.",
    description:
      "Zuverlaessige Gartenpflege in Backnang und Umgebung: Hecken schneiden, Rasen maehen, Baeume faellen und Abtransport.",
    url: siteUrl,
    type: "website",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ kontakt?: string }>;
}) {
  const [settings, services, projects, params] = await Promise.all([
    getBusinessSettings(),
    getServices(),
    getProjects(),
    searchParams,
  ]);

  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;
  const heroImage = settings.heroImage || "";
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: businessInfo.name,
    url: siteUrl,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    image: heroImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.streetAddress,
      postalCode: businessInfo.postalCode,
      addressLocality: businessInfo.addressLocality,
      addressCountry: businessInfo.addressCountry,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Backnang",
      },
      {
        "@type": "AdministrativeArea",
        name: "Backnang und Umgebung",
      },
    ],
    description:
      "Gartenservice Sami & Co. bietet Gartenpflege, Hecke schneiden, Rasen maehen, Baeume faellen und Gruenschnitt-Abtransport in Backnang und Umgebung.",
    keywords: seoKeywords.join(", "),
    priceRange: "$$",
    sameAs: [whatsappHref],
    makesOffer: [
      "Gartenservice Backnang",
      "Gartenpflege Backnang",
      "Hecke schneiden Backnang",
      "Rasen maehen Backnang",
      "Baeume faellen Backnang",
      "Entsorgung und Abtransport von Gruenschnitt",
    ],
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="relative min-h-[92svh] bg-[#123126] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,34,27,.92),rgba(12,34,27,.64),rgba(12,34,27,.2))]" />
        <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <a href="#" className="text-sm font-semibold tracking-[0.24em] uppercase">
              {settings.companyName}
            </a>
            <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
              <a href="#leistungen" className="hover:text-white">Leistungen</a>
              <a href="#projekte" className="hover:text-white">Projekte</a>
              <a href="#kontakt" className="hover:text-white">Kontakt</a>
            </nav>
            <a
              href={whatsappHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#d8c39a] px-4 text-sm font-semibold text-[#15362a] shadow-lg shadow-black/20 transition hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </header>

          <div className="flex flex-1 items-center py-16">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm text-white/85 backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#d8c39a]" />
                Gepflegte Gaerten. Saubere Arbeit. Direkter Ansprechpartner.
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
                {settings.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
                {settings.heroText}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#d8c39a] px-7 font-semibold text-[#143529] shadow-xl shadow-black/20 transition hover:bg-white"
                >
                  Angebot per WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#143529]"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-5 sm:grid-cols-3">
            {["Kostenlose Ersteinschaetzung", settings.serviceArea, "Abtransport auf Wunsch"].map((item) => (
              <div key={item} className="rounded-[8px] border border-white/14 bg-white/10 p-4 text-sm text-white/82 backdrop-blur-md">
                <BadgeCheck className="mb-3 h-5 w-5 text-[#d8c39a]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leistungen" className="bg-[#f8f3ea] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Leistungen</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-normal text-[#17352a] sm:text-5xl">
              Gartenpflege, die verlaesslich erledigt wird.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5e6c62]">
              Von der einzelnen Hecke bis zur regelmaessigen Gartenpflege in Backnang: Wir schneiden Hecken, maehen Rasen, uebernehmen Baumarbeiten und verlassen jede Flaeche ordentlich.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <article key={service.id} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17352a] text-[#d8c39a]">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#17352a]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5e6c62]">{service.description}</p>
                {service.priceNote ? <p className="mt-5 text-sm font-semibold text-[#8b6f42]">{service.priceNote}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projekte" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Vorher / Nachher</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-normal text-[#17352a] sm:text-5xl">
                Sichtbare Ergebnisse mit sauberer Uebergabe.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#5e6c62]">
              Ausgewaehlte Arbeiten aus Gartenpflege, Heckenschnitt und Gruenschnitt-Abtransport.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-[8px] border border-[#dfd2bc] bg-[#f8f3ea] shadow-[0_20px_60px_rgba(23,53,42,.1)]">
                <div className="grid grid-cols-2">
                  {[project.beforeImage, project.afterImage].map((image, index) => (
                    <div key={`${project.id}-${index}`} className="relative h-56 overflow-hidden bg-[#d8c39a]">
                      {image ? <SmartImage src={image} alt="" fill sizes="(min-width: 1024px) 17vw, 50vw" className="object-cover" /> : null}
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#17352a]">
                        {index === 0 ? "Vorher" : "Nachher"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6f42]">{project.location}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#17352a]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5e6c62]">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17352a] px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8c39a]">Warum wir</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
              Ein lokaler Gartenservice, der erreichbar bleibt.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Sorgfaeltig", text: "Wir achten auf Umgebung, Pflanzenbestand und eine saubere Arbeitsweise." },
              { icon: Clock, title: "Planbar", text: "Termine, Umfang und Abtransport werden vorab klar abgestimmt." },
              { icon: Sparkles, title: "Ordentlich", text: "Nach dem Einsatz bleibt die Flaeche gepflegt und nutzbar zurueck." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[8px] border border-white/12 bg-white/8 p-6">
                <Icon className="h-7 w-7 text-[#d8c39a]" strokeWidth={1.7} />
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-[#f8f3ea] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Kontakt</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-normal text-[#17352a] sm:text-5xl">
              Beschreiben Sie kurz Ihr Gartenprojekt.
            </h2>
            <div className="mt-8 space-y-4 text-[#5e6c62]">
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#8b6f42]" /> {settings.phone}</p>
              <p className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-[#8b6f42]" /> {settings.whatsapp}</p>
              <p>{settings.address}</p>
              <p>{settings.serviceArea}</p>
            </div>
          </div>
          <form action={submitContactRequest} className="rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_20px_70px_rgba(23,53,42,.1)] sm:p-8">
            {params?.kontakt === "gesendet" ? (
              <div className="mb-5 rounded-[8px] bg-[#e6f1e8] px-4 py-3 text-sm font-semibold text-[#17352a]">
                Vielen Dank. Ihre Anfrage wurde gesendet.
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Telefon" name="phone" required />
              <Field label="E-Mail" name="email" type="email" />
              <label className="block text-sm font-semibold text-[#17352a]">
                Leistung
                <select name="service" className="mt-2 h-12 w-full rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-4 text-[#17352a]">
                  {services.map((service) => <option key={service.id}>{service.title}</option>)}
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-[#17352a]">
              Nachricht
              <textarea name="message" required rows={5} className="mt-2 w-full rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-4 py-3 text-[#17352a]" />
            </label>
            <button className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-[#17352a] px-7 font-semibold text-white transition hover:bg-[#234a3b] sm:w-auto">
              Anfrage senden
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#10251d] px-5 py-10 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="text-white">{settings.companyName}</p>
          <p>{settings.phone} · WhatsApp {settings.whatsapp} · {settings.serviceArea}</p>
          <div className="flex gap-5">
            <a href="/impressum" className="hover:text-white">Impressum</a>
            <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
            <a href="/admin/login" className="hover:text-white">Admin</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#17352a]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 h-12 w-full rounded-[8px] border border-[#dfd2bc] bg-[#fbf8f2] px-4 text-[#17352a]"
      />
    </label>
  );
}
