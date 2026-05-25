"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(5),
  service: z.string().optional(),
  message: z.string().min(10),
});

async function uploadImage(file: File | null) {
  if (!file || file.size === 0) return undefined;
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}

export async function submitContactRequest(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect("/?kontakt=ungueltig#kontakt");
  }

  try {
    await prisma.contactRequest.create({ data: parsed.data });
  } catch {
    redirect("/?kontakt=offline#kontakt");
  }

  redirect("/?kontakt=gesendet#kontakt");
}

export async function adminLoginAction(formData: FormData) {
  const success = await loginAdmin(String(formData.get("email")), String(formData.get("password")));
  if (!success) {
    redirect("/admin/login?error=1");
  }
  redirect("/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const data = {
    title: String(formData.get("title")),
    description: String(formData.get("description")),
    priceNote: String(formData.get("priceNote") || ""),
    icon: String(formData.get("icon") || "Leaf"),
    order: Number(formData.get("order") || 0),
    active: formData.get("active") === "on",
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const beforeImage = await uploadImage(formData.get("beforeImage") as File | null);
  const afterImage = await uploadImage(formData.get("afterImage") as File | null);
  const data = {
    title: String(formData.get("title")),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description")),
    serviceType: String(formData.get("serviceType") || ""),
    featured: formData.get("featured") === "on",
    ...(beforeImage ? { beforeImage } : {}),
    ...(afterImage ? { afterImage } : {}),
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data: { ...data, afterImage: afterImage || "/uploads/placeholder.jpg" } });
  }

  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const heroImage = await uploadImage(formData.get("heroImage") as File | null);
  await prisma.businessSettings.upsert({
    where: { id: "business" },
    update: {
      companyName: String(formData.get("companyName")),
      phone: String(formData.get("phone")),
      whatsapp: String(formData.get("whatsapp")),
      email: String(formData.get("email")),
      address: String(formData.get("address")),
      serviceArea: String(formData.get("serviceArea")),
      heroTitle: String(formData.get("heroTitle")),
      heroText: String(formData.get("heroText")),
      ...(heroImage ? { heroImage } : {}),
    },
    create: {
      id: "business",
      companyName: String(formData.get("companyName")),
      phone: String(formData.get("phone")),
      whatsapp: String(formData.get("whatsapp")),
      email: String(formData.get("email")),
      address: String(formData.get("address")),
      serviceArea: String(formData.get("serviceArea")),
      heroTitle: String(formData.get("heroTitle")),
      heroText: String(formData.get("heroText")),
      ...(heroImage ? { heroImage } : {}),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function updateContactStatusAction(formData: FormData) {
  await requireAdmin();
  await prisma.contactRequest.update({
    where: { id: String(formData.get("id")) },
    data: { status: String(formData.get("status")) },
  });
  revalidatePath("/admin/contacts");
}
