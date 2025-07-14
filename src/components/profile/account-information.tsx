import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import type { ProfileData } from "@/lib/types.d";
import type { Dispatch, SetStateAction } from "react";

interface AccountInformationProps {
  profileData: ProfileData;
  setProfileData: Dispatch<SetStateAction<ProfileData>>;
  saveProfileData: () => void;
}

export default function AccountInformation({
  profileData,
  setProfileData,
  saveProfileData,
}: AccountInformationProps) {
  const isEditing = profileData.accountInformationEditing;
  const isSaving = profileData.isSaving;
  return (
    <div className="bg-white shadow-sm overflow-hidden border-[0.5px] border-gold">
      <div className="p-5 border-b border-gold flex justify-between items-center">
        <h2 className="font-medium flex items-center text-gray-800 font-garamond text-3xl">
          Account Information
        </h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setProfileData(prev => ({ ...prev, accountInformationEditing: true }))}
              className="px-4 py-1 text-sm border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded-sm flex items-center"
            >
              <Icon icon="mdi:pencil" className="mr-1" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setProfileData(prev => ({ ...prev, accountInformationEditing: false }))}
                className="px-4 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors rounded-sm flex items-center"
              >
                <Icon icon="mdi:close" className="mr-1" />
                Cancel
              </button>
              <button
                onClick={() => {
                  saveProfileData();
                  setProfileData(prev => ({ ...prev, accountInformationEditing: false }));
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Input
              label="Username"
              value={profileData.username}
              readOnly
              className="bg-gray-50 pr-10"
            />
            <div className="absolute right-3 top-[38px] text-gray-500">
              <Icon icon="mdi:lock" className="text-lg" />
            </div>
          </div>

          <div className="relative">
            <Input
              label="Password"
              type="password"
              value={profileData.password}
              readOnly={!isEditing}
              onChange={(e) => setProfileData(prev => ({ ...prev, password: e.target.value }))}
              className={!isEditing ? "bg-gray-50" : ""}
            />
            {isEditing && (
              <div className="absolute right-3 top-[38px] text-gray-500">
                <Icon icon="mdi:eye" className="text-lg cursor-pointer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
