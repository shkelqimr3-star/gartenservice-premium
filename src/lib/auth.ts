import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "garten_admin_session";

function sessionValue() {
  return process.env.SESSION_SECRET || "dev-session-secret";
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === sessionValue();
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function loginAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gartenservice.de";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-now";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const emailMatches = email.trim().toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = adminPasswordHash
    ? await bcrypt.compare(password, adminPasswordHash)
    : password === adminPassword;

  if (!emailMatches || !passwordMatches) {
    return false;
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return true;
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
