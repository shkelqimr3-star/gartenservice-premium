import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export class UploadError extends Error {
  constructor(public code: "missing-token" | "invalid-type" | "too-large" | "failed") {
    super(code);
  }
}

export function uploadErrorMessage(code?: string) {
  switch (code) {
    case "missing-token":
      return "Bild-Upload ist noch nicht konfiguriert. Bitte BLOB_READ_WRITE_TOKEN in Vercel setzen.";
    case "invalid-type":
      return "Bitte nur Bilder im Format JPG, JPEG, PNG oder WEBP hochladen.";
    case "too-large":
      return "Das Bild ist zu gross. Maximal erlaubt sind 5 MB.";
    case "failed":
      return "Das Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.";
    default:
      return undefined;
  }
}

function safeFilename(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

function validateImage(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (file.size > MAX_IMAGE_SIZE) {
    throw new UploadError("too-large");
  }

  if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_MIME_TYPES.has(file.type)) {
    throw new UploadError("invalid-type");
  }
}

export async function uploadImage(file: File | null, folder: "hero" | "projects") {
  if (!file || file.size === 0) return undefined;
  validateImage(file);

  const filename = `${folder}/${Date.now()}-${safeFilename(file.name)}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(filename, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return blob.url;
    } catch (error) {
      console.error("Vercel Blob upload failed.", error);
      throw new UploadError("failed");
    }
  }

  if (process.env.VERCEL === "1") {
    throw new UploadError("missing-token");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, path.basename(filename)), bytes);
  return `/uploads/${filename}`;
}
