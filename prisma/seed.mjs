import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.businessSettings.upsert({
    where: { id: "business" },
    update: {
      companyName: "Gartenservice Sami & Co.",
      phone: "+49 176 41178833",
      whatsapp: "+4917641178833",
      email: "hotis@outlook.de",
      address: "Etzwiesenstrasse 7, 71522 Backnang",
      serviceArea: "Backnang und Umgebung",
      heroTitle: "Zuverlaessiger Gartenservice in Backnang und Umgebung",
      heroText:
        "Wir kuemmern uns um Hecken, Rasen, Baumarbeiten und laufende Gartenpflege. Sauber, termintreu und mit direktem Ansprechpartner vor Ort.",
      heroImage:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2200&q=85",
    },
    create: {
      id: "business",
      companyName: "Gartenservice Sami & Co.",
      phone: "+49 176 41178833",
      whatsapp: "+4917641178833",
      email: "hotis@outlook.de",
      address: "Etzwiesenstrasse 7, 71522 Backnang",
      serviceArea: "Backnang und Umgebung",
      heroTitle: "Zuverlaessiger Gartenservice in Backnang und Umgebung",
      heroText:
        "Wir kuemmern uns um Hecken, Rasen, Baumarbeiten und laufende Gartenpflege. Sauber, termintreu und mit direktem Ansprechpartner vor Ort.",
      heroImage:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2200&q=85",
    },
  });

  const services = [
    [
      "service-1",
      "Hecke schneiden",
      "Praeziser Hecken- und Formschnitt fuer gepflegte Grundstuecksgrenzen, Sichtschutzhecken und Einfahrten. Wir arbeiten sauber, achten auf die passende Schnittzeit und nehmen den Gruenschnitt auf Wunsch direkt mit.",
      "Nach Besichtigung",
      "Scissors",
      1,
    ],
    [
      "service-2",
      "Rasen maehen",
      "Regelmaessiges Rasenmaehen inklusive sauberer Kanten, ordentlicher Flaechenpflege und kurzer Abstimmung zur saisonalen Pflege. Ideal fuer Privatgaerten, Mietobjekte und kleinere Gewerbeflaechen.",
      "Einmalig oder regelmaessig",
      "Leaf",
      2,
    ],
    [
      "service-3",
      "Baeume faellen",
      "Sorgfaeltige Baumfaellung, Rueckschnitt und Vorbereitung des Abtransports nach vorheriger Einschaetzung vor Ort. Wir achten auf Sicherheit, Umgebung und eine ordentliche Uebergabe der Flaeche.",
      "Mit Vor-Ort-Pruefung",
      "TreePine",
      3,
    ],
    [
      "service-4",
      "Gartenpflege",
      "Ganzheitliche Gartenpflege fuer Beete, Straeucher, Wege und Aussenanlagen. Wir bringen Struktur in den Garten, entfernen Wildwuchs und sorgen fuer ein gepflegtes Gesamtbild.",
      "Individuell planbar",
      "Sprout",
      4,
    ],
    [
      "service-5",
      "Entsorgung / Abtransport",
      "Abtransport von Gruenschnitt, Aesten, Laub, Stammholz und Gartenabfaellen nach dem Einsatz. So bleibt Ihr Garten nicht nur gepflegt, sondern auch direkt sauber nutzbar.",
      "Optional zubuchbar",
      "Truck",
      5,
    ],
  ];

  for (const [id, title, description, priceNote, icon, order] of services) {
    await prisma.service.upsert({
      where: { id },
      update: { title, description, priceNote, icon, order, active: true },
      create: { id, title, description, priceNote, icon, order, active: true },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
