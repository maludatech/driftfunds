"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { Spinner } from "@/components/shared/Spinner";
import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import { useTheme } from "next-themes";
import Loading from "./loading";
import { log } from "@/lib/logger";

// Interfaces
interface FormValues {
  oldPassword: string;
  newPassword: string;
}

// Validation schema
const schema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(15)
    .required("New password is required and must be at least 8 characters"),
});

// Reusable FormField component
const FormField = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  toggleType,
  onToggle,
}: {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: string;
  placeholder: string;
  toggleType?: () => void;
  onToggle?: () => void;
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-sm font-semibold capitalize text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        }`}
        placeholder={placeholder}
        {...register}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {toggleType && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label={type === "password" ? "Show password" : "Hide password"}
          onKeyDown={(e) => e.key === "Enter" && onToggle()}
        >
          {type === "password" ? (
            <Eye className="h-5 w-5 hover:cursor-pointer" />
          ) : (
            <EyeOff className="h-5 w-5 hover:cursor-pointer" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

const ChangePassword = ({ callbackUrl }: { callbackUrl: string }) => {
  const router = useRouter();
  const { admin } = useAdminStore();
  const { theme } = useTheme();

  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Authentication check
  useEffect(() => {
    if (!admin) {
      toast.error("Please sign in as an admin to access this page.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [admin, router, callbackUrl]);

  // Toggle password visibility
  const togglePasswordVisibility = (type: number) => {
    if (type === 1) {
      setShowPassword((prev) => !prev);
    } else {
      setShowPassword2((prev) => !prev);
    }
  };

  // Update errorMessage whenever there is a validation error
  useEffect(() => {
    if (errors.oldPassword) {
      setErrorMessage(errors.oldPassword.message || "");
    } else if (errors.newPassword) {
      setErrorMessage(errors.newPassword.message || "");
    } else {
      setErrorMessage("");
    }
  }, [errors]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
      const email = adminData.email;
      const formData = { ...data, email };

      const response = await fetch("/api/admin/change-password", {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
        setTimeout(() => setSuccessMessage(""), 3000);
        reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setTimeout(() => setErrorMessage(""), 3000);
      log.error("Error during password change:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toast notifications reactively
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage("");
    }
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage("");
    }
  }, [errorMessage, successMessage]);

  // Show skeleton during auth check or unauthorized access
  if (isCheckingAuth || !admin) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full max-w-md">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Change Password
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter your old password and new password to update your account.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              id="oldPassword"
              label="Old Password"
              type={showPassword ? "text" : "password"}
              register={register("oldPassword")}
              error={errors.oldPassword?.message}
              placeholder="Enter your old password"
              toggleType={() => setShowPassword(!showPassword)}
              onToggle={() => togglePasswordVisibility(1)}
            />
            <FormField
              id="newPassword"
              label="New Password"
              type={showPassword2 ? "text" : "password"}
              register={register("newPassword")}
              error={errors.newPassword?.message}
              placeholder="Enter your new password"
              toggleType={() => setShowPassword2(!showPassword2)}
              onToggle={() => togglePasswordVisibility(2)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
            >
              {isLoading ? (
                <Spinner otherStyles="h-5 w-5 mx-auto" />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
