"use server";

import { redirect } from "next/navigation";
import { loginAdmin } from "@/lib/auth";

export async function adminLoginAction(formData: FormData) {
  let success = false;

  try {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    console.log("[admin-login] ADMIN_EMAIL exists:", Boolean(process.env.ADMIN_EMAIL));
    console.log("[admin-login] ADMIN_PASSWORD exists:", Boolean(process.env.ADMIN_PASSWORD));
    console.log("[admin-login] submitted email:", email);
    console.log("[admin-login] submitted password exists:", Boolean(password));

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
