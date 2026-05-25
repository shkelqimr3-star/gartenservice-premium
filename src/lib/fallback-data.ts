export const fallbackSettings = {
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
};

export const fallbackServices = [
  {
    id: "hecke",
    title: "Hecke schneiden",
    description:
      "Form- und Pflegeschnitt für saubere Grundstückskanten, Sichtschutzhecken und repräsentative Eingänge.",
    priceNote: "Nach Besichtigung",
    icon: "Scissors",
    order: 1,
  },
  {
    id: "rasen",
    title: "Rasen mähen",
    description:
      "Regelmäßige Rasenpflege inklusive Kanten, Feinschnitt und saisonaler Pflegeempfehlung.",
    priceNote: "Abo möglich",
    icon: "Leaf",
    order: 2,
  },
  {
    id: "baeume",
    title: "Bäume fällen",
    description:
      "Sichere Baumfällung, Rückschnitt und Vorbereitung der Entsorgung für private und gewerbliche Flächen.",
    priceNote: "Mit Vor-Ort-Prüfung",
    icon: "TreePine",
    order: 3,
  },
  {
    id: "pflege",
    title: "Gartenpflege",
    description:
      "Ganzheitliche Pflege von Beeten, Wegen, Sträuchern und Außenanlagen mit einem gepflegten Finish.",
    priceNote: "Individuell",
    icon: "Sprout",
    order: 4,
  },
  {
    id: "entsorgung",
    title: "Entsorgung / Abtransport",
    description:
      "Sauberer Abtransport von Grünschnitt, Ästen, Stammholz und Gartenabfällen nach dem Einsatz.",
    priceNote: "Optional zubuchbar",
    icon: "Truck",
    order: 5,
  },
];

export const fallbackProjects = [
  {
    id: "vorgarten-koeln",
    title: "Vorgartenpflege in Köln",
    location: "Köln-Lindenthal",
    description: "Heckenschnitt, Rasenkanten und vollständiger Abtransport an einem Arbeitstag.",
    beforeImage:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Gartenpflege",
    featured: true,
  },
  {
    id: "hecke-bonn",
    title: "Formschnitt einer Sichtschutzhecke",
    location: "Bonn",
    description: "Präziser Rückschnitt einer hohen Hecke mit sauberer Übergabe.",
    beforeImage:
      "https://images.unsplash.com/photo-1599685315640-9ceab521f7a0?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Hecke schneiden",
    featured: true,
  },
  {
    id: "baum-leverkusen",
    title: "Baumrückschnitt mit Abtransport",
    location: "Leverkusen",
    description: "Sicherer Rückschnitt, Zerkleinerung und Entsorgung des Schnittguts.",
    beforeImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1558693168-c370615b54e0?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Bäume fällen",
    featured: false,
  },
];
