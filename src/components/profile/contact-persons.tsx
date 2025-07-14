import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import type { ProfileData } from "@/lib/types.d";
import type { Dispatch, SetStateAction } from "react";

interface ContactPersonsProps {
  profileData: ProfileData;
  setProfileData: Dispatch<SetStateAction<ProfileData>>;
  saveProfileData: () => void;
}

export default function ContactPersons({
  profileData,
  setProfileData,
  saveProfileData,
}: ContactPersonsProps) {
  const isEditing = profileData.contactPersonsEditing;
  const isSaving = profileData.isSaving;
  return (
    <div className="bg-white border-[0.5px] border-gold shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gold flex justify-between items-center">
        <h2 className="font-medium flex items-center text-gray-800 font-garamond text-3xl">
          Contact Persons
        </h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setProfileData(prev => ({ ...prev, contactPersonsEditing: true }))}
              className="px-4 py-1 text-sm border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded-sm flex items-center"
            >
              <Icon icon="mdi:pencil" className="mr-1" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setProfileData(prev => ({ ...prev, contactPersonsEditing: false }))}
                className="px-4 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm flex items-center"
              >
                <Icon icon="mdi:close" className="mr-1" />
                Cancel
              </button>
              <button
                onClick={() => {
                  saveProfileData();
                  setProfileData(prev => ({ ...prev, contactPersonsEditing: false }));
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

      <div className="p-5">
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-gray-500">
            Primary Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Name"
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />

            <Input
              label="Email"
              value={profileData.firstEmail}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstEmail: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-500">
            Secondary Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Name"
              value={profileData.secondName}
              onChange={(e) => setProfileData(prev => ({ ...prev, secondName: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />

            <Input
              label="Email"
              value={profileData.secondEmail}
              onChange={(e) => setProfileData(prev => ({ ...prev, secondEmail: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
