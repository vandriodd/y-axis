import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";

export default function StepFour({
  formData,
  setFormData,
}: StepComponentProps) {
  return (
    <>
      <Input
        label="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />

      <Input
        label="First Email"
        value={formData.firstEmail}
        onChange={(e) =>
          setFormData({ ...formData, firstEmail: e.target.value })
        }
      />

      <Input
        label="Second Name"
        value={formData.secondName}
        onChange={(e) =>
          setFormData({ ...formData, secondName: e.target.value })
        }
      />

      <Input
        label="Second Email"
        value={formData.secondEmail}
        onChange={(e) =>
          setFormData({ ...formData, secondEmail: e.target.value })
        }
      />
    </>
  );
}
