export default function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = label.toLowerCase().replace(" ", "-");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm text-primary uppercase tracking-widest"
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        id={id}
        className="bg-green/10 p-3 focus:outline-none focus:ring-1 border border-transparent focus:border-green/30 focus:ring-green"
      />
    </div>
  );
}
