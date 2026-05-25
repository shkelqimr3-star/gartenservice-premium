import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variable.");
    return false;
  }

  const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatches = password === adminPassword;

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
