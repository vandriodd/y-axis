import { STEPS, type FormData } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

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
            size="sm"
            onClick={onBack}
          >
            Previous
          </Button>
        )}

        <Button
          type="submit"
          size="md"
          className="font-medium ml-auto"
          disabled={
            step === STEPS.length - 1 ||
            !formData[`isStep${step + 1}Valid` as keyof typeof formData]
          }
        >
          {step === STEPS.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  );
}
