-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceNote" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT NOT NULL,
    "beforeImage" TEXT,
    "afterImage" TEXT NOT NULL,
    "serviceType" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSettings" (
    "id" TEXT NOT NULL DEFAULT 'business',
    "companyName" TEXT NOT NULL DEFAULT 'Gartenservice Sami & Co.',
    "phone" TEXT NOT NULL DEFAULT '+49 176 41178833',
    "whatsapp" TEXT NOT NULL DEFAULT '+4917641178833',
    "email" TEXT NOT NULL DEFAULT 'hotis@outlook.de',
    "address" TEXT NOT NULL DEFAULT 'Etzwiesenstrasse 7, 71522 Backnang',
    "serviceArea" TEXT NOT NULL DEFAULT 'Backnang und Umgebung',
    "heroTitle" TEXT NOT NULL DEFAULT 'Zuverlaessiger Gartenservice in Backnang und Umgebung',
    "heroText" TEXT NOT NULL DEFAULT 'Wir kuemmern uns um Hecken, Rasen, Baumarbeiten und laufende Gartenpflege. Sauber, termintreu und mit direktem Ansprechpartner vor Ort.',
    "heroImage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "service" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Neu',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);
