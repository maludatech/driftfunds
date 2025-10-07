"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Calendar } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SideNavbar from "@/components/shared/SideNavbar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/shared/Spinner";
import { toast } from "sonner";
import Loading from "./loading";
import { log } from "@/lib/logger";

// Form Values Interface
interface FormValues {
  password: string;
  confirmPassword: string;
}

const Profile = ({ callbackUrl = "/sign-in" }: { callbackUrl?: string }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { theme } = useTheme();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Added for loading state

  // Dynamic SVG background function (from Dashboard.tsx)
  const getSvgBackground = () => {
    const fillColor = theme === "dark" ? "%23fdfcff" : "%23030303";
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${fillColor}' fill-opacity='0.05' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.2zm0 16a5 5 0 1 1 0-2H304v34h-42.2zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 0 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const schema = yup.object().shape({
    password: yup.string().min(8).max(15).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors.password) {
      toast.error(errors.password.message);
    } else if (errors.confirmPassword) {
      toast.error(errors.confirmPassword.message);
    }
  }, [errors.password, errors.confirmPassword]);

  // Authentication check
  useEffect(() => {
    if (!user && !isCheckingAuth) {
      toast.error("Please sign in to access your profile.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [user, router, callbackUrl, isCheckingAuth]);

  // Show skeleton during auth check or for unauthenticated users
  if (isCheckingAuth || !user) {
    return <Loading />;
  }

  const togglePasswordVisibility = (type: number) => {
    if (type === 1) {
      setShowPassword((prev) => !prev);
    } else {
      setShowPassword2((prev) => !prev);
    }
  };

  // Format registration date (aligned with Dashboard's formatDate)
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "N/A";
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("en-US", { month: "long" });
    const year = new Date(date).getFullYear();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    return `${day}${suffix} ${month}, ${year}`;
  };

  const onSubmit = async (data: FormValues) => {
    if (!user?.email) {
      toast.error("User email not available. Please log in again.");
      return;
    }
    try {
      setIsLoading(true);
      const payload = {
        email: user.email,
        password: data.password,
      };
      const response = await fetch("/api/user/profile-update", {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      log.error("Error during profile update:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        <SideNavbar />
        <div className="lg:ml-[176px] xl:ml-[200px] 2xl:ml-[152px] flex flex-col gap-1 justify-center p-1 w-full">
          <h1 className="text-2xl first-letter:uppercase font-bold text-primary">
            {user?.username}'s Profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account details and update your password below.
          </p>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* User Information Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-6">
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Username
                </p>
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-primary">
                  {user?.username || "N/A"}
                </p>
              </div>
            </div>
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Email</p>
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-primary">
                  {user?.email || "N/A"}
                </p>
              </div>
            </div>
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Registration Date
                </p>
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-primary">
                  {formatDate(
                    user?.registrationDate
                      ? new Date(user.registrationDate)
                      : undefined
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Update Password Section */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mb-6">
            <h2 className="text-xl font-bold text-primary">Update Password</h2>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  New Password
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <Eye
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${
                      showPassword ? "hidden" : ""
                    }`}
                    size={20}
                    onClick={() => togglePasswordVisibility(1)}
                  />
                  <EyeOff
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${
                      showPassword ? "" : "hidden"
                    }`}
                    size={20}
                    onClick={() => togglePasswordVisibility(1)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    type={showPassword2 ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <Eye
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${
                      showPassword2 ? "hidden" : ""
                    }`}
                    size={20}
                    onClick={() => togglePasswordVisibility(2)}
                  />
                  <EyeOff
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${
                      showPassword2 ? "" : "hidden"
                    }`}
                    size={20}
                    onClick={() => togglePasswordVisibility(2)}
                  />
                </div>
              </div>
              <button
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner otherStyles="h-5 w-5" />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
