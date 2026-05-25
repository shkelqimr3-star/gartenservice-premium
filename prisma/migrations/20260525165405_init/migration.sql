-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceNote" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT NOT NULL,
    "beforeImage" TEXT,
    "afterImage" TEXT NOT NULL,
    "serviceType" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BusinessSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'business',
    "companyName" TEXT NOT NULL DEFAULT 'Gartenservice Grünwert',
    "phone" TEXT NOT NULL DEFAULT '+49 170 1234567',
    "whatsapp" TEXT NOT NULL DEFAULT '+491701234567',
    "email" TEXT NOT NULL DEFAULT 'kontakt@gartenservice-gruenwert.de',
    "address" TEXT NOT NULL DEFAULT 'Musterstraße 12, 50667 Köln',
    "serviceArea" TEXT NOT NULL DEFAULT 'Köln, Bonn, Leverkusen und Umgebung',
    "heroTitle" TEXT NOT NULL DEFAULT 'Premium Gartenservice für gepflegte Außenbereiche',
    "heroText" TEXT NOT NULL DEFAULT 'Hecken, Rasen, Bäume und komplette Gartenpflege aus einer Hand. Verlässlich, sauber und mit einem Blick fürs Detail.',
    "heroImage" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "service" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Neu',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
