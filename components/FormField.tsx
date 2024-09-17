import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  placeholder,
  required = false,
  onChange,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  </div>
);
