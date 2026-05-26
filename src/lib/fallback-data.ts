export const fallbackSettings = {
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
};

export const fallbackServices = [
  {
    id: "hecke",
    title: "Hecke schneiden",
    description:
      "Praeziser Hecken- und Formschnitt fuer gepflegte Grundstuecksgrenzen, Sichtschutzhecken und Einfahrten. Wir arbeiten sauber, achten auf die passende Schnittzeit und nehmen den Gruenschnitt auf Wunsch direkt mit.",
    priceNote: "Nach Besichtigung",
    icon: "Scissors",
    order: 1,
  },
  {
    id: "rasen",
    title: "Rasen maehen",
    description:
      "Regelmaessiges Rasenmaehen inklusive sauberer Kanten, ordentlicher Flaechenpflege und kurzer Abstimmung zur saisonalen Pflege. Ideal fuer Privatgaerten, Mietobjekte und kleinere Gewerbeflaechen.",
    priceNote: "Einmalig oder regelmaessig",
    icon: "Leaf",
    order: 2,
  },
  {
    id: "baeume",
    title: "Baeume faellen",
    description:
      "Sorgfaeltige Baumfaellung, Rueckschnitt und Vorbereitung des Abtransports nach vorheriger Einschaetzung vor Ort. Wir achten auf Sicherheit, Umgebung und eine ordentliche Uebergabe der Flaeche.",
    priceNote: "Mit Vor-Ort-Pruefung",
    icon: "TreePine",
    order: 3,
  },
  {
    id: "pflege",
    title: "Gartenpflege",
    description:
      "Ganzheitliche Gartenpflege fuer Beete, Straeucher, Wege und Aussenanlagen. Wir bringen Struktur in den Garten, entfernen Wildwuchs und sorgen fuer ein gepflegtes Gesamtbild.",
    priceNote: "Individuell planbar",
    icon: "Sprout",
    order: 4,
  },
  {
    id: "entsorgung",
    title: "Entsorgung / Abtransport",
    description:
      "Abtransport von Gruenschnitt, Aesten, Laub, Stammholz und Gartenabfaellen nach dem Einsatz. So bleibt Ihr Garten nicht nur gepflegt, sondern auch direkt sauber nutzbar.",
    priceNote: "Optional zubuchbar",
    icon: "Truck",
    order: 5,
  },
];

export const fallbackProjects = [
  {
    id: "vorgarten-backnang",
    title: "Vorgartenpflege in Backnang",
    location: "Backnang",
    description: "Heckenschnitt, Rasenkanten und vollstaendiger Abtransport an einem Arbeitstag.",
    beforeImage:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Gartenpflege",
    featured: true,
  },
  {
    id: "hecke-backnang",
    title: "Formschnitt einer Sichtschutzhecke",
    location: "Backnang und Umgebung",
    description: "Praeziser Rueckschnitt einer hohen Hecke mit sauberer Uebergabe.",
    beforeImage:
      "https://images.unsplash.com/photo-1599685315640-9ceab521f7a0?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Hecke schneiden",
    featured: true,
  },
  {
    id: "baum-backnang",
    title: "Baumrueckschnitt mit Abtransport",
    location: "Rems-Murr-Kreis",
    description: "Sicherer Rueckschnitt, Zerkleinerung und Entsorgung des Schnittguts.",
    beforeImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1558693168-c370615b54e0?auto=format&fit=crop&w=1200&q=80",
    serviceType: "Baeume faellen",
    featured: false,
  },
];
