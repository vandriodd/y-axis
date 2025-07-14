import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";

export default function StepTwo({ formData, setFormData }: StepComponentProps) {
  return (
    <>
      <Input
        label="Business Registration Number"
        value={formData.businessRegistrationNo || ""}
        onChange={(e) =>
          setFormData({ ...formData, businessRegistrationNo: e.target.value })
        }
      />

      <Input
        label="EIN"
        value={formData.ein || ""}
        onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
      />

      <Input
        label="VAT Registration Number"
        value={formData.vatRegistrationNo || ""}
        onChange={(e) =>
          setFormData({ ...formData, vatRegistrationNo: e.target.value })
        }
      />

      <Input
        label="Date of Incorporation"
        value={formData.dateOfIncorporation || ""}
        onChange={(e) =>
          setFormData({ ...formData, dateOfIncorporation: e.target.value })
        }
      />
    </>
  );
}
