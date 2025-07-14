import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { STEPS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import type { FormData } from "@/lib/types";

interface OnboardingFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  step: number;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function OnboardingForm({
  onSubmit,
  onBack,
  step,
  formData,
  setFormData,
}: OnboardingFormProps) {
  const StepComponent = STEPS[step].component;

  return (
    <form onSubmit={onSubmit} className="grid gap-y-4">
      <div className="flex flex-col gap-4">
        <StepComponent formData={formData} setFormData={setFormData} />
      </div>

      <div className="flex justify-between mt-6">
        {step !== 0 && (
          <Button
            type="button"
            className="font-medium"
            size="md"
            onClick={onBack}
          >
            <Icon icon="heroicons-solid:chevron-left" />
            Previous
          </Button>
        )}

        <Button
          type="submit"
          size="md"
          className="font-medium ml-auto"
          disabled={
            !formData[`isStep${step + 1}Valid` as keyof typeof formData]
          }
        >
          Next
          <Icon icon="heroicons-solid:chevron-right" />
        </Button>
      </div>
    </form>
  );
}
