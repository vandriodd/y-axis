import { TYPE_OF_BUSINESS } from "@/lib/constants";
import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";

export default function StepOne({ formData, setFormData }: StepComponentProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Trade Name"
        value={formData.tradeName}
        onChange={(e) =>
          setFormData({ ...formData, tradeName: e.target.value })
        }
      />

      <div className="flex flex-col gap-2">
        <label
          className="text-sm uppercase text-primary tracking-widest"
          htmlFor="type-of-business"
        >
          Type of Business
        </label>
        <select
          id="type-of-business"
          value={formData.typeOfBusiness}
          onChange={(e) =>
            setFormData({ ...formData, typeOfBusiness: e.target.value })
          }
          className="bg-green/10 p-3 focus:outline-none focus:ring-1 border border-transparent focus:border-green/30 focus:ring-green"
        >
          {TYPE_OF_BUSINESS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Parent Company"
        value={formData.parentCompany}
        onChange={(e) =>
          setFormData({ ...formData, parentCompany: e.target.value })
        }
      />

      <Input
        label="Registered Name"
        value={formData.registeredName}
        onChange={(e) =>
          setFormData({ ...formData, registeredName: e.target.value })
        }
      />
    </div>
  );
}
