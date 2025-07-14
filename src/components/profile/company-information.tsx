import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { TYPE_OF_BUSINESS } from "@/lib/constants";
import {
  SelectContent,
  SelectTrigger,
  SelectItem,
  Select,
  SelectValue,
} from "../ui/select";
import type { ProfileData } from "@/lib/types.d";
import type { Dispatch, SetStateAction } from "react";

interface CompanyInformationProps {
  profileData: ProfileData;
  setProfileData: Dispatch<SetStateAction<ProfileData>>;
  saveProfileData: () => void;
}

export default function CompanyInformation({
  profileData,
  setProfileData,
  saveProfileData,
}: CompanyInformationProps) {
  const isEditing = profileData.companyInformationEditing;
  const isSaving = profileData.isSaving;
  const { tradeName, typeOfBusiness, parentCompany, registeredName } =
    profileData;

  return (
    <div className="border-[0.5px] border-gold rounded-md overflow-hidden bg-white">
      <div className="bg-white border-[0.5px] border-gold p-4 border-b flex justify-between items-center">
        <h2 className="font-medium flex items-center text-gray-800 font-garamond text-3xl">
          Company Information
        </h2>
        {!isEditing ? (
          <button
            onClick={() =>
              setProfileData((prev) => ({
                ...prev,
                companyInformationEditing: true,
              }))
            }
            className="px-4 py-1 text-sm border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded-sm flex items-center cursor-pointer"
          >
            <Icon icon="mdi:pencil" className="mr-1" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() =>
                setProfileData((prev) => ({
                  ...prev,
                  companyInformationEditing: false,
                }))
              }
              className="px-4 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm flex items-center cursor-pointer"
            >
              <Icon icon="mdi:close" className="mr-1" />
              Cancel
            </button>
            <button
              onClick={() => {
                saveProfileData();
                setProfileData((prev) => ({
                  ...prev,
                  companyInformationEditing: false,
                }));
              }}
              disabled={isSaving}
              className="px-4 py-1 text-sm border border-gold bg-gold text-white hover:bg-gold/90 transition-colors rounded-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Icon icon="mdi:loading" className="mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Icon icon="mdi:check" className="mr-1" />
                  Save
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Trade Name"
          value={tradeName}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, tradeName: e.target.value }))
          }
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase text-gold tracking-widest">
            Type of Business
          </label>
          {isEditing ? (
            <Select
              value={typeOfBusiness}
              onValueChange={(value) =>
                setProfileData((prev) => ({ ...prev, typeOfBusiness: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {TYPE_OF_BUSINESS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={
                TYPE_OF_BUSINESS.find((t) => t.value === typeOfBusiness)
                  ?.label || typeOfBusiness
              }
              readOnly
              className="bg-gray-50"
            />
          )}
        </div>

        <Input
          label="Parent Company"
          value={parentCompany}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              parentCompany: e.target.value,
            }))
          }
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />

        <Input
          label="Registered Name"
          value={registeredName}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              registeredName: e.target.value,
            }))
          }
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </div>
  );
}
