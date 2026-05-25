"use server";

import { redirect } from "next/navigation";
import { loginAdmin } from "@/lib/auth";

export async function adminLoginAction(formData: FormData) {
  let success = false;

  try {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    success = await loginAdmin(email, password);
  } catch (error) {
    console.error("Admin login failed.", error);
    redirect("/admin/login?error=server");
  }

  if (!success) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin");
}
