import type { FC, Dispatch, SetStateAction } from "react";
import StepOne from "../components/step-1";
import StepTwo from "../components/step-2";
import StepThree from "../components/step-3";
import StepFour from "../components/step-4";
import FinalStep from "@/components/final-step";

export interface FormData {
  tradeName: string;
  typeOfBusiness: string;
  parentCompany: string;
  registeredName: string;
  businessRegistrationNo: string;
  ein: string;
  vatRegistrationNo: string;
  dateOfIncorporation: Date | undefined;
  postalAddress: string;
  shipmentAddress: string;
  portOfShipment: string;
  faxNo: string;
  phoneNo: string;
  firstName: string;
  firstEmail: string;
  secondName: string;
  secondEmail: string;

  username?: string;
  password?: string;

  isStep1Valid?: boolean;
  isStep2Valid?: boolean;
  isStep3Valid?: boolean;
  isStep4Valid?: boolean;
  isStep5Valid?: boolean;
}

export interface StepComponentProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

type StepComponent = FC<StepComponentProps>;

export const STEPS = [
  {
    step: 1,
    title: "Company Information",
    component: StepOne as StepComponent,
  },
  {
    step: 2,
    title: "Business Registration",
    component: StepTwo as StepComponent,
  },
  {
    step: 3,
    title: "Contact Details",
    component: StepThree as StepComponent,
  },
  {
    step: 4,
    title: "Contact Persons",
    component: StepFour as StepComponent,
  },
  {
    step: 5,
    title: "Your account",
    component: FinalStep as StepComponent,
  },
];

export const TYPE_OF_BUSINESS = [
  { value: "llc", label: "Limited Liability Company" },
  { value: "private-company", label: "Private Company" },
  { value: "public-company", label: "Public Company" },
  { value: "global-business-company", label: "Global Business Company" },
  { value: "authorised-company", label: "Authorised Company" },
  { value: "sole-trader", label: "Sole Trader" },
  { value: "partnership", label: "Partnership" },
  { value: "limited-partnership", label: "Limited Partnership" },
  { value: "societe", label: "Société" },
  { value: "cooperative-society", label: "Cooperative Society" },
  { value: "trust", label: "Trust" },
  { value: "non-mauritian", label: "Non-Mauritian (International)" },
  { value: "other", label: "Other" },
];

export const MIN_USERNAME_LENGTH = 4;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 40;
