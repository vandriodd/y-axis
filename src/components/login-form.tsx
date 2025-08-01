import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Icon } from "@iconify/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "@/lib/constants";
import useAuthContext from "@/hooks/useAuthContext";

interface FormErrors {
  username: string;
  password: string;
}

interface FormStatus {
  submitted: boolean;
  success: boolean;
  message: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    success: false,
    message: "",
  });
  const [, setLocation] = useLocation();
  const { signIn } = useAuthContext();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < MIN_USERNAME_LENGTH) {
      newErrors.username = `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const res = await signIn(username, password);

      if (!res) {
        setFormStatus({
          submitted: true,
          success: false,
          message: "Invalid credentials",
        });
        return;
      }

      setFormStatus({
        submitted: true,
        success: true,
        message: "Login successful!",
      });

      setLocation("/home");
    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fix the errors above",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {formStatus.submitted && (
          <div
            className={`flex items-center gap-2 text-sm p-2 rounded ${
              formStatus.success
                ? "bg-green/10 text-green"
                : "bg-red-500/10 text-red-500"
            } mb-2`}
          >
            {formStatus.success ? (
              <Icon icon="solar:check-circle-bold" />
            ) : (
              <Icon icon="solar:close-circle-bold" />
            )}
            {formStatus.message}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`bg-green/10 p-3 focus:outline-none focus:ring-1 ${
              errors.username
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border border-transparent focus:border-green/30 focus:ring-green"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-xs mt-1">{errors.username}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-green/10 p-3 w-full pr-10 focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border border-transparent focus:border-green/30 focus:ring-green"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3/4 -translate-y-1/2 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 h-fit hover:text-green focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <Icon icon="heroicons-solid:eye" width="20" height="20" />
              ) : (
                <Icon icon="heroicons-solid:eye-off" width="20" height="20" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password}</span>
          )}
        </div>

        <Button
          type="submit"
          className="bg-green text-white px-6 py-3 flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 cursor-pointer hover:bg-green/80 mt-4"
        >
          Log In
        </Button>
      </form>

      <div className="flex items-center w-full my-6">
        <div className="flex-grow h-px bg-gold/70"></div>
        <span className="px-4 text-sm text-gold">or</span>
        <div className="flex-grow h-px bg-gold/70"></div>
      </div>

      <section className="text-center lg:text-left">
        <small className="text-gold">
          Don't have an account?{" "}
          <Link
            href="/onboarding"
            className="font-semibold underline hover:text-gold/80 transition-colors"
          >
            Sign up
          </Link>
        </small>
      </section>
    </>
  );
}
