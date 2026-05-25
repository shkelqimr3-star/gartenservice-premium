import { prisma } from "@/lib/prisma";
import { fallbackProjects, fallbackServices, fallbackSettings } from "@/lib/fallback-data";

export async function getBusinessSettings() {
  try {
    const settings = await prisma.businessSettings.upsert({
      where: { id: "business" },
      update: {},
      create: {},
    });
    return {
      ...settings,
      heroImage: settings.heroImage || fallbackSettings.heroImage,
    };
  } catch {
    return fallbackSettings;
  }
}

export async function getServices(includeInactive = false) {
  try {
    return await prisma.service.findMany({
      where: includeInactive ? undefined : { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  } catch {
    return fallbackServices;
  }
}

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return fallbackProjects;
  }
}

export async function getContactRequests() {
  try {
    return await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}
