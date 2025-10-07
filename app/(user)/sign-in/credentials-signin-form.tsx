"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Spinner } from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";

// Interfaces
interface FormValues {
  email: string;
  password: string;
}

interface CustomJwtPayload {
  userId: string;
  fullName: string;
  email: string;
  username: string;
  nationality: string;
  referralCode: string;
}

interface User {
  userId: string;
  fullName: string;
  email: string;
  username: string;
  nationality: string;
  referralCode: string;
  registrationDate: string;
}

interface SignInResponse {
  token: string;
  registrationDate: string;
}

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
    .required("Password is required"),
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

// Error handling utility
const handleApiError = (status: number, message?: string) => {
  switch (status) {
    case 401:
      return "Invalid email or password.";
    case 404:
      return "Service not found.";
    default:
      return message || "Something went wrong.";
  }
};

const CredentialsSignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const router = useRouter();
  const { user, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form setup
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

  const decodeJwtToken = (token: string): CustomJwtPayload | null => {
    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
      toast.error("Error decoding token");
      return null;
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const normalizedData = { ...data, email: data.email.toLowerCase() };
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(handleApiError(response.status, message));
        return;
      }

      const { token, registrationDate }: SignInResponse = await response.json();

      const decodedToken = decodeJwtToken(token);
      if (decodedToken) {
        const user: User = {
          userId: decodedToken.userId,
          fullName: decodedToken.fullName,
          email: decodedToken.email,
          username: decodedToken.username,
          nationality: decodedToken.nationality,
          referralCode: decodedToken.referralCode,
          registrationDate,
        };
        login(user);
        router.push("/dashboard");
      } else {
        toast.error("Failed to decode authentication token.");
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
        <h2 className="mb-4 text-2xl font-bold text-primary">Sign In</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your email and password to sign in to your account.
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
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            placeholder="Enter your password"
            toggleType={() => setShowPassword(!showPassword)}
            onToggle={() => setShowPassword(!showPassword)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? <Spinner otherStyles="h-5 w-5 mx-auto" /> : "Sign In"}
          </button>
        </form>

        <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <Link
            href="/forgot-password"
            className="underline hover:underline-offset-4 hover:text-primary"
          >
            Forgot Password?
          </Link>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="underline hover:underline-offset-4 hover:text-primary"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSignInForm;
