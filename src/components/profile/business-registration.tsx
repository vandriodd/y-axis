import { format } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import type { ProfileData } from "@/lib/types.d";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface BusinessRegistrationProps {
  profileData: ProfileData;
  setProfileData: Dispatch<SetStateAction<ProfileData>>;
  saveProfileData: () => void;
}

export default function BusinessRegistration({
  profileData,
  setProfileData,
  saveProfileData,
}: BusinessRegistrationProps) {
  const isEditing = profileData.businessRegistrationEditing;
  const isSaving = profileData.isSaving;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  return (
    <div className="bg-white border-[0.5px] border-gold shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gold flex justify-between items-center">
        <h2 className="font-medium flex items-center text-gray-800 font-garamond text-3xl">
          Business Registration
        </h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setProfileData(prev => ({ ...prev, businessRegistrationEditing: true }))}
              className="px-4 py-1 text-sm border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded-sm flex items-center"
            >
              <Icon icon="mdi:pencil" className="mr-1" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setProfileData(prev => ({ ...prev, businessRegistrationEditing: false }))}
                className="px-4 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm flex items-center"
              >
                <Icon icon="mdi:close" className="mr-1" />
                Cancel
              </button>
              <button
                onClick={() => {
                  saveProfileData();
                  setProfileData(prev => ({ ...prev, businessRegistrationEditing: false }));
                }}
                disabled={isSaving}
                className="px-4 py-1 text-sm border border-gold bg-gold text-white hover:bg-gold/90 transition-colors rounded-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Icon icon="mdi:loading" className="mr-1 animate-spin" />
                ) : (
                  <Icon icon="mdi:check" className="mr-1" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Business Registration Number"
          value={profileData.businessRegistrationNo}
          onChange={(e) =>
            setProfileData(prev => ({ ...prev, businessRegistrationNo: e.target.value }))
          }
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />

        <Input
          label="EIN"
          value={profileData.ein}
          onChange={(e) => setProfileData(prev => ({ ...prev, ein: e.target.value }))}
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />

        <Input
          label="VAT Registration Number"
          value={profileData.vatRegistrationNo}
          onChange={(e) =>
            setProfileData(prev => ({ ...prev, vatRegistrationNo: e.target.value }))
          }
          readOnly={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Date of Incorporation
          </label>
          {isEditing ? (
            <Popover
              open={isDatePickerOpen}
              onOpenChange={(open) => setIsDatePickerOpen?.(open)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Icon icon="mdi:calendar" className="mr-2 h-4 w-4" />
                  {profileData.dateOfIncorporation ? (
                    format(profileData.dateOfIncorporation, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={profileData.dateOfIncorporation}
                  onSelect={(date) => {
                    setProfileData(prev => ({ ...prev, dateOfIncorporation: date }));
                    setIsDatePickerOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Input
              value={
                profileData.dateOfIncorporation
                  ? format(profileData.dateOfIncorporation, "PPP")
                  : ""
              }
              readOnly
              className="bg-gray-50"
            />
          )}
        </div>
      </div>
    </div>
  );
}
