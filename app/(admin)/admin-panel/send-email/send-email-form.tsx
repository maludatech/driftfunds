"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Spinner } from "@/components/shared/Spinner";
import { useAdminStore } from "@/store/useAdminStore";
import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import Loading from "./loading";
import { log } from "@/lib/logger";
import { marked } from "marked";

// Interfaces
interface FormValues {
  subject: string;
  heading: string;
  message: string;
}

// Reusable FormField component
const FormField = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  rows,
}: {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: string;
  placeholder: string;
  rows?: number;
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="text-sm font-semibold capitalize text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={id}
          className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={placeholder}
          {...register}
          rows={rows}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type="text"
          className={`w-full p-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={placeholder}
          {...register}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
    </div>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

const SendEmailForm = ({
  callbackUrl = "/admin/sign-in",
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();
  const { admin } = useAdminStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // preview state
  const [previewData, setPreviewData] = useState<FormValues>({
    subject: "",
    heading: "",
    message: "",
  });

  // Authentication check
  useEffect(() => {
    if (!admin) {
      toast.error("Please sign in as an admin to access this page.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [admin, router, callbackUrl]);

  // Form validation schema
  const schema = yup.object().shape({
    subject: yup.string().required("Email subject is required"),
    heading: yup.string().required("Email heading is required"),
    message: yup
      .string()
      .min(50, "Message must be at least 50 characters")
      .required("Message is required and must be at least 50 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Watch for live changes → update preview
  const watchedSubject = watch("subject");
  const watchedHeading = watch("heading");
  const watchedMessage = watch("message");

  useEffect(() => {
    setPreviewData({
      subject: watchedSubject || "",
      heading: watchedHeading || "",
      message: watchedMessage || "",
    });
  }, [watchedSubject, watchedHeading, watchedMessage]);

  // Update errorMessage whenever there is a validation error
  useEffect(() => {
    if (errors.subject) {
      setErrorMessage(errors.subject.message || "");
    } else if (errors.heading) {
      setErrorMessage(errors.heading.message || "");
    } else if (errors.message) {
      setErrorMessage(errors.message.message || "");
    } else {
      setErrorMessage(""); // Clear error message if no errors
    }
  }, [errors]);

  // Handle toast notifications reactively
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(""); // Clear after showing toast
    }
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage(""); // Clear after showing toast
    }
  }, [errorMessage, successMessage]);

  // Show skeleton during auth check or for unauthenticated admins
  if (isCheckingAuth || !admin) {
    return <Loading />;
  }

  // Handle form submission
  const onSubmit = async (data: FormValues, e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        body: JSON.stringify(data),
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
      log.error("Error while sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background body-container p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col md:flex-row justify-center items-start w-full gap-6">
        {/* Left: form */}
        <div className="flex flex-col w-full gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-primary">Send Email</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter the subject, heading, and message to send an email to users.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              id="subject"
              label="Subject"
              type="text"
              register={register("subject")}
              error={errors.subject?.message}
              placeholder="Enter email subject"
            />
            <FormField
              id="heading"
              label="Heading"
              type="text"
              register={register("heading")}
              error={errors.heading?.message}
              placeholder="Enter email heading"
            />
            <FormField
              id="message"
              label="Message"
              type="textarea"
              register={register("message")}
              error={errors.message?.message}
              placeholder="Enter your message (Markdown supported)"
              rows={10}
            />
            <p className="text-xs text-muted-foreground">
              Supports Markdown (e.g. **bold**, _italic_, # Heading,
              [link](https://example.com))
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Spinner otherStyles="h-5 w-5 mx-auto" />
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>

        {/* Right: live preview */}
        <div className="flex flex-col w-full md:w-xl rounded-lg bg-card/80 p-6 shadow-md overflow-auto">
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Live Preview
          </h3>
          <h4 className="text-xl font-bold mb-2">{previewData.heading}</h4>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked(previewData.message || ""),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SendEmailForm;
