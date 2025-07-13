import { useState } from "react";
import { useLocation } from "wouter";
import { STEPS, type FormData } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import OnboardingForm from "@/components/onboarding-form";

export default function Onboarding() {
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
    dateOfIncorporation: "",
    postalAddress: "",
    shipmentAddress: "",
    portOfShipment: "",
    faxNo: "",
    phoneNo: "",
    firstName: "",
    firstEmail: "",
    secondName: "",
    secondEmail: "",
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setLocation("/home");
    }
  };

  return (
    <section className="relative min-h-screen">
      <div className="absolute top-6 left-6 z-20">
        <h1 className="font-garamond text-2xl font-semibold text-white">
          Y-Axis
        </h1>
      </div>

      <div className="lg:hidden min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="z-10 w-full max-w-sm bg-bg-primary shadow-xl p-6 sm:p-8 opacity-95">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:cursor-pointer"
            >
              <Icon icon="heroicons-solid:chevron-left" />
              Go Back
            </button>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase text-primary tracking-wider">
                STEP 0{step + 1}/0{STEPS.length}
              </p>
            </div>
          </div>

          <header className="mb-6">
            <h1 className="font-garamond text-2xl font-bold text-accent-foreground text-center">
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
      </div>

      <div className="hidden lg:flex min-h-screen w-full">
        <div className="w-1/2 relative bg-[url('/login.jpg')] bg-cover bg-center"></div>

        <div className="w-1/2 relative">
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:cursor-pointer"
            >
              <Icon icon="heroicons-solid:chevron-left" />
              Go Back
            </button>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase text-primary tracking-wider">
                STEP 0{step + 1}/0{STEPS.length}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center h-full p-8 lg:p-16 pt-24">
            <div className="max-w-xl w-full">
              <header className="mb-6">
                <h1 className="font-garamond text-4xl font-bold text-accent-foreground text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
