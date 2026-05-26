import { saveSettingsAction } from "@/app/actions";
import { SubmitButton, TextAreaField, TextField } from "@/components/admin-fields";
import { SmartImage } from "@/components/smart-image";
import { getBusinessSettings } from "@/lib/data";
import { uploadErrorMessage } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ uploadError?: string }>;
}) {
  const params = await searchParams;
  const settings = await getBusinessSettings();
  const uploadError = uploadErrorMessage(params?.uploadError);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f42]">Business Settings</p>
      <h2 className="mt-2 text-4xl font-semibold text-[#17352a]">Firmendaten bearbeiten</h2>
      {uploadError ? (
        <div className="mt-6 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {uploadError}
        </div>
      ) : null}
      <form action={saveSettingsAction} className="mt-8 grid gap-5 rounded-[8px] border border-[#dfd2bc] bg-white p-6 shadow-[0_18px_50px_rgba(23,53,42,.08)] lg:grid-cols-2">
        <TextField label="Firmenname" name="companyName" defaultValue={settings.companyName} required />
        <TextField label="Telefon" name="phone" defaultValue={settings.phone} required />
        <TextField label="WhatsApp Nummer" name="whatsapp" defaultValue={settings.whatsapp} required />
        <TextField label="E-Mail" name="email" type="email" defaultValue={settings.email} required />
        <TextField label="Adresse" name="address" defaultValue={settings.address} />
        <TextField label="Einzugsgebiet" name="serviceArea" defaultValue={settings.serviceArea} />
        <div className="lg:col-span-2">
          <TextField label="Hero Headline" name="heroTitle" defaultValue={settings.heroTitle} required />
        </div>
        <div className="lg:col-span-2">
          <TextAreaField label="Hero Text" name="heroText" defaultValue={settings.heroText} rows={5} />
        </div>
        <label className="block text-sm font-semibold text-[#17352a] lg:col-span-2">
          Hero Bild hochladen
          <input name="heroImage" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="mt-2 w-full rounded-[8px] border border-[#dfd2bc] bg-white px-3 py-2 text-sm" />
        </label>
        {settings.heroImage ? (
          <div className="relative h-52 overflow-hidden rounded-[8px] lg:col-span-2">
            <SmartImage src={settings.heroImage} alt="" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="lg:col-span-2">
          <SubmitButton>Firmendaten speichern</SubmitButton>
        </div>
      </form>
    </div>
  );
}
