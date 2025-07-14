import { useState } from "react";
import { useLocation } from "wouter";
import { STEPS } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import OnboardingForm from "@/components/onboarding-form";
import type { FormData } from "@/lib/types";
import useAuthContext from "@/hooks/useAuthContext";

export default function Onboarding() {
  const { signIn, signUp } = useAuthContext();
  const [step, setStep] = useState<number>(0);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    tradeName: "",
    typeOfBusiness: "",
    parentCompany: "",
    registeredName: "",
    businessRegistrationNo: "",
    ein: "",
    vatRegistrationNo: "",
    dateOfIncorporation: undefined,
    postalAddress: "",
    shipmentAddress: "",
    portOfShipment: "",
    faxNo: "",
    phoneNo: "",
    firstName: "",
    firstEmail: "",
    secondName: "",
    secondEmail: "",

    username: "",
    password: "",

    isStep1Valid: false,
    isStep2Valid: false,
    isStep3Valid: false,
    isStep4Valid: false,
    isStep5Valid: false,
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    } else {
      const user = await signUp(formData);

      if (!user) {
        setFormData((prev) => ({
          ...prev,
          isStep5Valid: false,
        }));
        return;
      }

      await signIn(user.username, user.password);

      setLocation("/home");
    }
  };

  return (
    <main className="relative min-h-screen">
      <header className="absolute top-6 left-6 z-20">
        <h2 className="font-garamond text-2xl font-semibold text-white">
          Y-Axis
        </h2>
      </header>

      <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="z-10 w-full max-w-md bg-bg-primary shadow-xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:cursor-pointer"
            >
              <Icon icon="heroicons-solid:chevron-left" />
              Return to Landing
            </button>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase text-primary tracking-wider">
                STEP 0{step + 1}/0{STEPS.length}
              </p>
            </div>
          </div>

          <header className="mb-6">
            <h1 className="font-garamond text-3xl font-bold text-accent text-center">
              {STEPS[step].title}
            </h1>
          </header>

          <OnboardingForm
            onSubmit={handleSubmit}
            onBack={handleBack}
            step={step}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </section>
    </main>
  );
}
