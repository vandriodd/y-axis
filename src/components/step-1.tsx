import { useEffect } from "react";
import { TYPE_OF_BUSINESS } from "@/lib/constants";
import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function StepOne({ formData, setFormData }: StepComponentProps) {
  useEffect(() => {
    const isValid =
      formData.tradeName &&
      formData.typeOfBusiness &&
      formData.registeredName &&
      formData.parentCompany;

    if (isValid && !formData.isStep1Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep1Valid: true,
      }));
    } else if (!isValid && formData.isStep1Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep1Valid: false,
      }));
    }
  }, [formData, setFormData]);

  return (
    <>
      <Input
        label="Trade Name"
        placeholder="Marble"
        value={formData.tradeName}
        onChange={(e) =>
          setFormData({ ...formData, tradeName: e.target.value })
        }
      />

      <Select
        label="Type of Business"
        value={formData.typeOfBusiness}
        onValueChange={(value) =>
          setFormData({ ...formData, typeOfBusiness: value })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {TYPE_OF_BUSINESS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        label="Parent Company"
        placeholder="Marble Fishing LLC"
        value={formData.parentCompany}
        onChange={(e) =>
          setFormData({ ...formData, parentCompany: e.target.value })
        }
      />

      <Input
        label="Registered Name"
        placeholder="Marble Fishing LLC"
        value={formData.registeredName}
        onChange={(e) =>
          setFormData({ ...formData, registeredName: e.target.value })
        }
      />
    </>
  );
}
