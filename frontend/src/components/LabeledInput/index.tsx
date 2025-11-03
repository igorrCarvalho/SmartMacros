import { Input } from "../ui/input";

export default function LabeledInput({ id, label, styles, required = false, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; styles?: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="font-semibold">
        {label} {required && (<span className="text-red-400">*</span>)}
        <Input id={id} className={styles} {...props} />
    </label>
  );
}