import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";

export default function StepThree({
  formData,
  setFormData,
}: StepComponentProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Postal Address"
        value={formData.postalAddress || ""}
        onChange={(e) =>
          setFormData({ ...formData, postalAddress: e.target.value })
        }
      />

      <Input
        label="Shipment Address"
        value={formData.shipmentAddress || ""}
        onChange={(e) =>
          setFormData({ ...formData, shipmentAddress: e.target.value })
        }
      />

      <Input
        label="Port of Shipment"
        value={formData.portOfShipment || ""}
        onChange={(e) =>
          setFormData({ ...formData, portOfShipment: e.target.value })
        }
      />

      <Input
        label="Fax No"
        value={formData.faxNo || ""}
        onChange={(e) => setFormData({ ...formData, faxNo: e.target.value })}
      />

      <Input
        label="Phone No"
        value={formData.phoneNo || ""}
        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
      />
    </div>
  );
}
