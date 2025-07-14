import type { ProfileData } from "@/lib/types.d";
import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";

interface ContactDetailsProps {
  profileData: ProfileData;
  setProfileData: Dispatch<SetStateAction<ProfileData>>;
  saveProfileData: () => void;
}

export default function ContactDetails({
  profileData,
  setProfileData,
  saveProfileData,
}: ContactDetailsProps) {
  const isEditing = profileData.contactDetailsEditing;
  const isSaving = profileData.isSaving;
  return (
    <div className="bg-white border-[0.5px] border-gold shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gold flex justify-between items-center">
        <h2 className="font-medium flex items-center text-gray-800 font-garamond text-3xl">
          Contact Details
        </h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() =>
                setProfileData((prev) => ({
                  ...prev,
                  contactDetailsEditing: true,
                }))
              }
              className="px-4 py-1 text-sm border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded-sm flex items-center cursor-pointer"
            >
              <Icon icon="mdi:pencil" className="mr-1" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  setProfileData((prev) => ({
                    ...prev,
                    contactDetailsEditing: false,
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
                    contactDetailsEditing: false,
                  }));
                }}
                disabled={isSaving}
                className="px-4 py-1 text-sm border border-gold bg-gold text-white hover:bg-gold/90 transition-colors rounded-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Input
            label="Postal Address"
            value={profileData.postalAddress}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                postalAddress: e.target.value,
              }))
            }
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />

          <Input
            label="Shipment Address"
            value={profileData.shipmentAddress}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                shipmentAddress: e.target.value,
              }))
            }
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <Input
            label="Port of Shipment"
            value={profileData.portOfShipment}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                portOfShipment: e.target.value,
              }))
            }
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />

          <Input
            label="Phone Number"
            value={profileData.phoneNo}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, phoneNo: e.target.value }))
            }
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />

          <Input
            label="Fax Number"
            value={profileData.faxNo}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, faxNo: e.target.value }))
            }
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>
      </div>
    </div>
  );
}
