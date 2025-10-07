"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/shared/Spinner";

// Validation schema
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});

// Form values type
interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

// Reusable FormField component
const FormField = ({
  id,
  label,
  type,
  register,
  error,
  showPassword,
  togglePasswordVisibility,
}: {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
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
        type={showPassword ? "text" : type}
        className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        }`}
        {...register}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && togglePasswordVisibility()
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 hover:cursor-pointer" />
        ) : (
          <Eye className="h-5 w-5 hover:cursor-pointer" />
        )}
      </button>
    </div>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

const CredentialsResetPasswordForm = ({
  callbackUrl,
}: {
  callbackUrl: string;
}) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  // React hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  //Authentication check
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  // Validate userId
  useEffect(() => {
    if (!userId) {
      toast.error(
        "Invalid or missing user ID. Please try the reset process again."
      );
      router.push("/forgot-password");
    }
  }, [userId, router]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    if (!userId) return;

    setIsLoading(true);
    setServerError(undefined);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId }),
      });

      if (response.ok) {
        toast.success("Password reset successfully");
        router.replace("/sign-in");
      } else {
        const result = await response.json();
        const errorMessage = result.message || "Failed to reset password";
        setServerError(errorMessage);
        toast.error(errorMessage);
      }
    } catch {
      const errorMessage = "An unexpected error occurred";
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background p-4 py-24 text-foreground">
      <div className="w-full max-w-md rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-primary">Reset Password</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your new password below to reset your account password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          role="form"
          aria-label="Reset password form"
        >
          <FormField
            id="newPassword"
            label="New Password"
            type="password"
            register={register("newPassword")}
            error={errors.newPassword?.message}
            showPassword={showNewPassword}
            togglePasswordVisibility={() =>
              setShowNewPassword(!showNewPassword)
            }
          />
          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          {serverError && (
            <p
              id="server-error"
              className="text-center text-sm text-red-500 dark:text-red-400"
            >
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !userId}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? (
              <Spinner otherStyles="h-5 w-5 mx-auto" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CredentialsResetPasswordForm;
