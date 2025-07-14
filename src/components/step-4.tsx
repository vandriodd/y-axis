import { useEffect } from "react";
import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";

export default function StepFour({
  formData,
  setFormData,
}: StepComponentProps) {
  useEffect(() => {
    const isValid =
      formData.firstName &&
      formData.firstEmail &&
      formData.secondName &&
      formData.secondEmail;

    if (isValid && !formData.isStep4Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep4Valid: true,
      }));
    } else if (!isValid && formData.isStep4Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep4Valid: false,
      }));
    }
  }, [formData, setFormData]);

  return (
    <>
      <Input
        label="First Name"
        placeholder="Patrick Koper"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />

      <Input
        label="First Email"
        placeholder="patrick@marblefishing.com"
        value={formData.firstEmail}
        onChange={(e) =>
          setFormData({ ...formData, firstEmail: e.target.value })
        }
      />

      <Input
        label="Second Name"
        placeholder="Petro Analytis"
        value={formData.secondName}
        onChange={(e) =>
          setFormData({ ...formData, secondName: e.target.value })
        }
      />

      <Input
        label="Second Email"
        placeholder="petro@marblefishing.com"
        value={formData.secondEmail}
        onChange={(e) =>
          setFormData({ ...formData, secondEmail: e.target.value })
        }
      />
    </>
  );
}
