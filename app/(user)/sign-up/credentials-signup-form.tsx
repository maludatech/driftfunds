"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "countries-list";
import { toast } from "sonner";
import * as yup from "yup";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Spinner } from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password cannot exceed 15 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(10, "Username cannot exceed 10 characters"),
  fullName: yup.string().required("Full name is required"),
  nationality: yup.string().required("Please select your nationality"),
  referralCode: yup
    .string()
    .max(6, "Referral code must be a 6-digit code")
    .optional()
    .nullable(),
});

type FormValues = yup.InferType<typeof schema>;

// Reusable FormField component
const FormField = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  showPassword,
  onToggle,
  options,
  control, // Added for react-hook-form Controller
}: {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: string;
  placeholder?: string;
  showPassword?: boolean;
  onToggle?: () => void;
  options?: { value: string; label: string }[];
  control?: any; // For react-hook-form Controller
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-sm font-semibold capitalize text-foreground"
    >
      {label}
    </label>
    {type === "select" && options ? (
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              id={id}
              className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-label={`Select ${label}`}
            >
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    ) : (
      <div className="relative">
        <input
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={placeholder}
          {...register}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {type === "password" && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onToggle()
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    )}
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

// Error handling utility
const handleApiError = (message?: string) => {
  return message || "Failed to sign up. Please try again.";
};

const CredentialsSignUpForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referral");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  // Form setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues, any, FormValues>(schema as any),
    defaultValues: {
      nationality: "",
      referralCode: referralCode || null,
    },
  });

  // Authentication check
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  // Validate referral code
  useEffect(() => {
    if (referralCode && referralCode.length !== 6) {
      toast.error("Invalid referral code. It must be a 6-digit code.");
    }
  }, [referralCode]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setServerError(undefined);

    const processedData = {
      ...data,
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
    };

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        toast.success("Account created successfully! Please sign in.");
        router.replace("/sign-in");
      } else {
        const { message } = await response.json();
        const errorMessage = handleApiError(message);
        setServerError(errorMessage);
        toast.error(errorMessage);
      }
    } catch {
      const errorMessage = "An unexpected error occurred.";
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare nationality options
  const nationalityOptions = Object.entries(countries).map(
    ([code, country]) => ({
      value: code,
      label: country.name,
    })
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-background p-4 pt-24 text-foreground">
      <div className="w-full max-w-md rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Sign Up
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Create a new account to get started with {APP_NAME}.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          role="form"
          aria-label="Sign up form"
        >
          <FormField
            id="username"
            label="Username"
            type="text"
            register={register("username")}
            error={errors.username?.message}
            placeholder="Enter your username"
          />
          <FormField
            id="fullName"
            label="Full Name"
            type="text"
            register={register("fullName")}
            error={errors.fullName?.message}
            placeholder="Enter your full name"
          />
          <FormField
            id="email"
            label="Email Address"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="Enter your email"
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
            placeholder="Enter your password"
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your password"
            showPassword={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <FormField
            id="nationality"
            label="Nationality"
            type="select"
            control={control}
            register={register("nationality")}
            error={errors.nationality?.message}
            options={nationalityOptions}
          />
          <FormField
            id="referralCode"
            label="Referral Code (Optional)"
            type="text"
            register={register("referralCode")}
            error={errors.referralCode?.message}
            placeholder="Enter referral code (if any)"
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
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? <Spinner otherStyles="h-5 w-5 mx-auto" /> : "Sign Up"}
          </button>
        </form>

        <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <p>By creating an account, you accept our</p>
          <p>
            <Link
              href="/terms-of-service"
              className="underline hover:underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="underline hover:underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline hover:underline-offset-4 hover:text-primary"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSignUpForm;
