export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-[#17352a]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-2 h-11 w-full rounded-[8px] border border-[#dfd2bc] bg-white px-3 text-sm"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-[#17352a]">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="mt-2 w-full rounded-[8px] border border-[#dfd2bc] bg-white px-3 py-3 text-sm"
      />
    </label>
  );
}

export function SubmitButton({ children = "Speichern" }: { children?: React.ReactNode }) {
  return (
    <button className="inline-flex h-11 items-center justify-center rounded-full bg-[#17352a] px-5 text-sm font-semibold text-white transition hover:bg-[#234a3b]">
      {children}
    </button>
  );
}
