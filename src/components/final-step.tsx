import { useEffect, useState } from "react";
import type { StepComponentProps } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function FinalStep({
  formData,
  setFormData,
}: StepComponentProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  useEffect(() => {
    if (!formData.username) {
      const baseUsername = formData.tradeName
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
        .replace(/__+/g, "_");

      const randomDigits = Math.floor(1000 + Math.random() * 9000);

      const username = `${baseUsername}_${randomDigits}`;

      setFormData({
        ...formData,
        username,
      });
    }

    setPasswordsMatch(formData.password === confirmPassword);

    const isValid =
      formData.username &&
      formData.password &&
      formData.password.length >= 8 &&
      formData.password === confirmPassword;

    if (isValid && !formData.isStep5Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep5Valid: true,
      }));
    } else if (!isValid && formData.isStep5Valid) {
      setFormData((prevData) => ({
        ...prevData,
        isStep5Valid: false,
      }));
    }
  }, [formData, setFormData, confirmPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const copyUsername = async () => {
    try {
      await navigator.clipboard.writeText(formData.username || "");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        We've generated a unique username for you based on your business name,
        which you should use to login to your account. This username is not
        modifiable.
      </p>

      <div className="relative mb-4">
        <Input
          label="Username"
          value={formData.username}
          readOnly
          className="bg-gray-100 cursor-not-allowed pr-16"
        />
        <div className="absolute right-12 top-[38px] text-gray-500">
          <Icon icon="mdi:lock" className="text-lg" />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-[32px] text-gray-600 hover:text-accent transition-all hover:bg-transparent"
          onClick={copyUsername}
          title="Copy username"
        >
          <Icon
            icon={copySuccess ? "mdi:check" : "mdi:content-copy"}
            className="text-lg"
          />
        </Button>
        {copySuccess && (
          <div className="absolute right-1 top-[65px] text-xs text-green-600 bg-white px-2 py-1 rounded-md shadow-sm">
            Copied!
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password (min. 8 characters)"
          value={formData.password}
          onChange={handlePasswordChange}
          required
          minLength={8}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-[32px] text-gray-600 hover:text-accent transition-all hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide password" : "Show password"}
        >
          <Icon
            icon={
              showPassword ? "heroicons-solid:eye-off" : "heroicons-solid:eye"
            }
            className="text-lg"
          />
        </Button>
      </div>

      <div className="relative mb-2">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          minLength={8}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-[32px] text-gray-600 hover:text-accent transition-all hover:bg-transparent"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          title={showConfirmPassword ? "Hide password" : "Show password"}
        >
          <Icon
            icon={
              showConfirmPassword
                ? "heroicons-solid:eye-off"
                : "heroicons-solid:eye"
            }
            className="text-lg"
          />
        </Button>
      </div>

      {formData.password && formData.password.length < 8 && (
        <p className="text-red-500 text-sm mt-1 mb-2">
          Password must be at least 8 characters long.
        </p>
      )}

      {formData.password && confirmPassword && !passwordsMatch && (
        <p className="text-red-500 text-sm mt-1 mb-2">
          Passwords do not match.
        </p>
      )}
    </>
  );
}
