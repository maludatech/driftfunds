"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/shared/Spinner";

// Reusable CodeInput component
interface CodeInputProps {
  code: string[];
  onChange: (code: string[]) => void;
  error?: string;
}

const CodeInput = ({ code, onChange, error }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return; // Allow only alphanumeric or empty
    const newCode = [...code];
    newCode[index] = value.toUpperCase(); // Convert to uppercase for consistency
    onChange(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .split("")
      .filter((char) => /^[a-zA-Z0-9]$/.test(char));
    if (paste.length > 0) {
      const newCode = [...code];
      paste.forEach((char, i) => {
        if (i < 6) newCode[i] = char.toUpperCase();
      });
      onChange(newCode);
      const focusIndex = Math.min(paste.length, 5);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus(); // Auto-focus first input
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {code.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`h-12 w-12 rounded-lg border bg-background text-center text-lg font-medium text-foreground focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent transition-all ${
              error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="X"
            aria-label={`Alphanumeric code character ${index + 1}`}
            aria-describedby={error ? "code-error" : undefined}
          />
        ))}
      </div>
      {error && (
        <p
          id="code-error"
          className="text-center text-sm text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
};

const CredentialsRestorePasswordForm = ({
  callbackUrl,
}: {
  callbackUrl: string;
}) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | undefined>(undefined);

  //Authentication check
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.every((char) => char !== "")) {
      handleContinue();
    }
  }, [code]);

  const handleContinue = async () => {
    setIsLoading(true);
    setError(undefined);
    const restoreCode = code.join("").toLowerCase();

    if (restoreCode.length !== 6) {
      setError("Please enter a 6-character code.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/restore-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: restoreCode }),
      });

      if (response.ok) {
        const { userId } = await response.json();
        router.replace(`/reset-password?userId=${userId}`);
      } else {
        const data = await response.json();
        setError(data.message || "Invalid code. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) {
      toast.error("Please provide an email to resend the code.");
      router.push("/forgot-password");
      return;
    }

    setResendLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        toast.success("Code resent successfully. Check your email.");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to resend code.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background p-4 pt-24 text-foreground">
      <div className="w-full max-w-md rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Restore Password
        </h2>
        <p className="mb-6 text-sm text-muted-foreground text-center">
          Enter the 6-character alphanumeric code sent to your email (e.g.,
          A1B2C3).
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
          className="flex flex-col gap-6"
        >
          <CodeInput code={code} onChange={setCode} error={error} />

          <button
            type="submit"
            disabled={isLoading || code.some((char) => char === "")}
            aria-busy={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-[var(--color-primary-light)] px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? <Spinner otherStyles="h-5 w-5" /> : "Continue"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-sm text-primary underline hover:underline-offset-4 disabled:opacity-50"
          >
            {resendLoading ? (
              <Spinner otherStyles="inline h-4 w-4 mr-1" />
            ) : (
              "Didn't get a code? Resend email"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CredentialsRestorePasswordForm;
