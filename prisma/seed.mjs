import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.businessSettings.upsert({
    where: { id: "business" },
    update: {},
    create: {
      id: "business",
      companyName: "Gartenservice Grünwert",
      phone: "+49 170 1234567",
      whatsapp: "+491701234567",
      email: "kontakt@gartenservice-gruenwert.de",
      address: "Musterstraße 12, 50667 Köln",
      serviceArea: "Köln, Bonn, Leverkusen und Umgebung",
      heroTitle: "Premium Gartenservice für gepflegte Außenbereiche",
      heroText:
        "Hecken, Rasen, Bäume und komplette Gartenpflege aus einer Hand. Verlässlich, sauber und mit einem Blick fürs Detail.",
      heroImage:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2200&q=85",
    },
  });

  const services = [
    ["service-1", "Hecke schneiden", "Form- und Pflegeschnitt für saubere Grundstückskanten, Sichtschutzhecken und repräsentative Eingänge.", "Nach Besichtigung", "Scissors", 1],
    ["service-2", "Rasen mähen", "Regelmäßige Rasenpflege inklusive Kanten, Feinschnitt und saisonaler Pflegeempfehlung.", "Abo möglich", "Leaf", 2],
    ["service-3", "Bäume fällen", "Sichere Baumfällung, Rückschnitt und Vorbereitung der Entsorgung für private und gewerbliche Flächen.", "Mit Vor-Ort-Prüfung", "TreePine", 3],
    ["service-4", "Gartenpflege", "Ganzheitliche Pflege von Beeten, Wegen, Sträuchern und Außenanlagen mit einem gepflegten Finish.", "Individuell", "Sprout", 4],
    ["service-5", "Entsorgung / Abtransport", "Sauberer Abtransport von Grünschnitt, Ästen, Stammholz und Gartenabfällen nach dem Einsatz.", "Optional zubuchbar", "Truck", 5],
  ];

  for (const [id, title, description, priceNote, icon, order] of services) {
    await prisma.service.upsert({
      where: { id },
      update: { title, description, priceNote, icon, order, active: true },
      create: { id, title, description, priceNote, icon, order, active: true },
    });
  }

  const projects = [
    {
      id: "project-vorgarten",
      title: "Vorgartenpflege in Köln",
      location: "Köln-Lindenthal",
      description: "Heckenschnitt, Rasenkanten und vollständiger Abtransport an einem Arbeitstag.",
      beforeImage: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1200&q=80",
      serviceType: "Gartenpflege",
      featured: true,
    },
    {
      id: "project-hecke",
      title: "Formschnitt einer Sichtschutzhecke",
      location: "Bonn",
      description: "Präziser Rückschnitt einer hohen Hecke mit sauberer Übergabe.",
      beforeImage: "https://images.unsplash.com/photo-1599685315640-9ceab521f7a0?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
      serviceType: "Hecke schneiden",
      featured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
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
