import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = () => {
    if (!trackingNumber) return;

    setIsTracking(true);

    setTimeout(() => {
      setIsTracking(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-medium flex items-center text-gray-800">
          <Icon icon="mdi:package-variant" className="mr-2 text-accent" />
          Track Your Order
        </h3>
      </div>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <Input
              label="Enter Order/Tracking Number"
              placeholder="e.g. ORD-1234 or TRK-5678"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleTrack}
              className="bg-accent hover:bg-accent/80 text-white w-full sm:w-auto"
              disabled={!trackingNumber || isTracking}
            >
              {isTracking ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin mr-2" />
                  Tracking...
                </>
              ) : (
                <>
                  <Icon icon="mdi:magnify" className="mr-2" />
                  Track Order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
