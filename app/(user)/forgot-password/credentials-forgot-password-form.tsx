"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/shared/Spinner";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// Form values type
interface FormValues {
  email: string;
}

// Reusable FormField component
const FormField = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: string;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-sm font-semibold capitalize text-foreground"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
        error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
      }`}
      placeholder={placeholder}
      {...register}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

const CredentialsForgotPasswordForm = ({
  callbackUrl,
}: {
  callbackUrl: string;
}) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //Authentication check
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  // React hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues, any, FormValues>(schema as any),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          "Password reset email sent! Check your inbox or spam folder."
        );
        router.replace("/restore-password");
      } else {
        const result = await response.json();
        toast.error(result.message || "Failed to send reset email.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background p-4 pt-24 text-foreground">
      <div className="w-full max-w-md rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-primary ">
          Forgot Password
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your email address to receive instructions for resetting your
          password. Check your inbox or spam folder for the email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="Enter your email"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? (
              <Spinner otherStyles="h-5 w-5 mx-auto" />
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CredentialsForgotPasswordForm;
