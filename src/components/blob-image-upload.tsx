"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

type BlobImageUploadProps = {
  folder: "hero" | "projects";
  inputName: string;
  label: string;
  existingUrl?: string | null;
};

function validateFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (file.size > MAX_IMAGE_SIZE) {
    return "Das Bild ist zu gross. Maximal erlaubt sind 5 MB.";
  }

  if (!ALLOWED_TYPES.has(file.type) || !ALLOWED_EXTENSIONS.has(extension)) {
    return "Bitte nur JPG, JPEG, PNG oder WEBP hochladen.";
  }

  return undefined;
}

export function BlobImageUpload({ folder, inputName, label, existingUrl }: BlobImageUploadProps) {
  const [url, setUrl] = useState(existingUrl || "");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleFileChange(file: File | undefined) {
    setError("");

    if (!file) {
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    setStatus("uploading");

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
      const blob = await upload(`${folder}/${Date.now()}-${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      setUrl(blob.url);
      setStatus("done");
    } catch (uploadError) {
      console.error("Client Blob upload failed.", uploadError);
      setStatus("error");
      setError("Upload fehlgeschlagen. Bitte Verbindung pruefen und erneut versuchen.");
    }
  }

  return (
    <label className="block text-sm font-semibold text-[#17352a]">
      {label}
      <input type="hidden" name={inputName} value={url} />
      <input type="hidden" data-upload-state={status} value={status} readOnly />
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={(event) => handleFileChange(event.target.files?.[0])}
        className="mt-2 w-full rounded-[8px] border border-[#dfd2bc] bg-white px-3 py-2 text-sm"
      />
      {status === "uploading" ? (
        <span className="mt-2 block text-xs font-semibold text-[#8b6f42]">Bild wird hochgeladen...</span>
      ) : null}
      {status === "done" ? (
        <span className="mt-2 block text-xs font-semibold text-green-700">Bild wurde hochgeladen.</span>
      ) : null}
      {error ? <span className="mt-2 block text-xs font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}

export function UploadSubmitGuard() {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const formElement = markerRef.current?.closest("form");
    if (!formElement) return;
    const form = formElement;

    function handleSubmit(event: SubmitEvent) {
      const uploadStates = Array.from(
        form.querySelectorAll<HTMLInputElement>("input[data-upload-state]"),
      ).map((input) => input.value);

      if (uploadStates.includes("uploading")) {
        event.preventDefault();
        setMessage("Bitte warten Sie, bis alle Bilder fertig hochgeladen sind.");
      }

      if (uploadStates.includes("error")) {
        event.preventDefault();
        setMessage("Bitte beheben Sie den Bild-Upload-Fehler, bevor Sie speichern.");
      }
    }

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <span ref={markerRef} className="block">
      {message ? <span className="block text-sm font-semibold text-red-700">{message}</span> : null}
    </span>
  );
}
