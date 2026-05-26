"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logoutAdmin, requireAdmin } from "@/lib/auth";
import { uploadImage, UploadError } from "@/lib/uploads";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(5),
  service: z.string().optional(),
  message: z.string().min(10),
});

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
  let beforeImage: string | undefined;
  let afterImage: string | undefined;

  try {
    beforeImage = await uploadImage(formData.get("beforeImage") as File | null, "projects");
    afterImage = await uploadImage(formData.get("afterImage") as File | null, "projects");
  } catch (error) {
    if (error instanceof UploadError) {
      redirect(`/admin/gallery?uploadError=${error.code}`);
    }
    console.error("Project image upload failed.", error);
    redirect("/admin/gallery?uploadError=failed");
  }

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
  let heroImage: string | undefined;

  try {
    heroImage = await uploadImage(formData.get("heroImage") as File | null, "hero");
  } catch (error) {
    if (error instanceof UploadError) {
      redirect(`/admin/settings?uploadError=${error.code}`);
    }
    console.error("Hero image upload failed.", error);
    redirect("/admin/settings?uploadError=failed");
  }

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
