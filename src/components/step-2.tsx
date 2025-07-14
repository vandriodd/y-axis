import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { StepComponentProps } from "@/lib/constants";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

export default function StepTwo({ formData, setFormData }: StepComponentProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const isValid =
      formData.businessRegistrationNo &&
      formData.ein &&
      formData.vatRegistrationNo &&
      formData.dateOfIncorporation;

    if (isValid && !formData.isStep2Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep2Valid: true,
      }));
    } else if (!isValid && formData.isStep2Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep2Valid: false,
      }));
    }
  }, [formData, setFormData]);

  return (
    <>
      <Input
        label="Business Registration Number"
        placeholder="123456789"
        value={formData.businessRegistrationNo}
        onChange={(e) =>
          setFormData({ ...formData, businessRegistrationNo: e.target.value })
        }
      />

      <Input
        label="EIN"
        placeholder="32-0793986"
        value={formData.ein}
        onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
      />

      <Input
        label="VAT Registration Number"
        placeholder="GB123456789"
        value={formData.vatRegistrationNo}
        onChange={(e) =>
          setFormData({ ...formData, vatRegistrationNo: e.target.value })
        }
      />

      <div className="w-full">
        <span
          className="text-sm text-gold uppercase tracking-widest block mb-2"
          onClick={() => setOpen(true)}
        >
          Date of Incorporation
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
            >
              {formData.dateOfIncorporation
                ? formData.dateOfIncorporation.toLocaleDateString()
                : "Select date"}
              <Icon icon="lucide:calendar" className="text-gold" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              aria-label="Date of Incorporation"
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setFormData({
                  ...formData,
                  dateOfIncorporation: date,
                });
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
