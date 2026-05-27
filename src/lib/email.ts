import { Resend } from "resend";

type ContactEmailInput = {
  name: string;
  phone: string;
  email?: string | null;
  service?: string | null;
  message: string;
  createdAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

export async function sendContactNotification(input: ContactEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact email notification skipped: missing Resend environment variables.");
    return;
  }

  const resend = new Resend(apiKey);
  const submittedAt = formatDate(input.createdAt);
  const customerEmail = input.email || "Nicht angegeben";
  const selectedService = input.service || "Nicht angegeben";

  const text = [
    "Neue Anfrage ueber die Website - Gartenservice Sami & Co.",
    "",
    `Name: ${input.name}`,
    `Telefon: ${input.phone}`,
    `E-Mail: ${customerEmail}`,
    `Leistung: ${selectedService}`,
    `Eingang: ${submittedAt}`,
    "",
    "Nachricht:",
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #17352a; line-height: 1.6;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">Neue Anfrage ueber die Website</h1>
      <p style="margin: 0 0 18px;">Gartenservice Sami &amp; Co. hat eine neue Kontaktanfrage erhalten.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Telefon</td><td>${escapeHtml(input.phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">E-Mail</td><td>${escapeHtml(customerEmail)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Leistung</td><td>${escapeHtml(selectedService)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Eingang</td><td>${escapeHtml(submittedAt)}</td></tr>
      </table>
      <h2 style="font-size: 18px; margin: 22px 0 8px;">Nachricht</h2>
      <p style="white-space: pre-wrap; background: #f8f3ea; border: 1px solid #dfd2bc; padding: 14px; border-radius: 8px;">${escapeHtml(input.message)}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Neue Anfrage über die Website – Gartenservice Sami & Co.",
    text,
    html,
    replyTo: input.email || undefined,
  });

  if (error) {
    console.error("Contact email notification failed:", error);
  }
}
