import { useEffect } from "react";
import type { StepComponentProps } from "@/lib/constants";
import { Input } from "../ui/input";

export default function StepThree({
  formData,
  setFormData,
}: StepComponentProps) {
  useEffect(() => {
    const isValid =
      formData.postalAddress &&
      formData.shipmentAddress &&
      formData.portOfShipment &&
      formData.faxNo &&
      formData.phoneNo;

    if (isValid && !formData.isStep3Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep3Valid: true,
      }));
    } else if (!isValid && formData.isStep3Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep3Valid: false,
      }));
    }
  }, [formData, setFormData]);

  return (
    <>
      <Input
        label="Postal Address"
        placeholder="1207 Delaware Ave, #116, Wilimngton DE, 19806"
        value={formData.postalAddress}
        onChange={(e) =>
          setFormData({ ...formData, postalAddress: e.target.value })
        }
      />

      <Input
        label="Shipment Address"
        placeholder="384 Av Lansdowne, Westmount, QC, H3Z2L4, Canada"
        value={formData.shipmentAddress}
        onChange={(e) =>
          setFormData({ ...formData, shipmentAddress: e.target.value })
        }
      />

      <Input
        label="Port of Shipment"
        placeholder="Port Louis, Mauritius"
        value={formData.portOfShipment}
        onChange={(e) =>
          setFormData({ ...formData, portOfShipment: e.target.value })
        }
      />

      <Input
        label="Fax No"
        placeholder="+1 270 637 6982"
        value={formData.faxNo}
        onChange={(e) => setFormData({ ...formData, faxNo: e.target.value })}
      />

      <Input
        label="Phone No"
        placeholder="+1 514-717-1431"
        value={formData.phoneNo}
        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
      />
    </>
  );
}
