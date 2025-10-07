"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { Spinner } from "@/components/shared/Spinner";
import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import Loading from "./loading";
import { toast } from "sonner";
import { log } from "@/lib/logger";

interface User {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  nationality: string;
}

interface FormValues {
  updatedPassword: string;
}

const EditInvestors = ({
  params,
  callbackUrl = "/admin/sign-in",
}: {
  params: { id?: string };
  callbackUrl?: string;
}) => {
  const { admin } = useAdminStore();
  const router = useRouter();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [activeDeposit, setActiveDeposit] = useState<string | null>(null);
  const [lastDeposit, setLastDeposit] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [pendingDeposit, setPendingDeposit] = useState<string | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string | null>(null);
  const [pendingWithdrawal, setPendingWithdrawal] = useState<string | null>(
    null
  );
  const [lastWithdrawal, setLastWithdrawal] = useState<string | null>(null);
  const [dailyReturn, setDailyReturn] = useState<string | null>(null);
  const [totalReturn, setTotalReturn] = useState<string | null>(null);

  // Yup validation schema
  const schema = yup.object().shape({
    updatedPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must not exceed 15 characters")
      .required("Password is required"),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !admin) return;
      try {
        const response = await fetch(`/api/admin/users/edit/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          log.error("Failed to fetch user details");
          toast.error("Failed to fetch user details.");
        }
      } catch (error) {
        log.error("Error fetching user details:", error);
        toast.error("Error fetching user details.");
      }
    };

    const fetchDeposit = async () => {
      if (!userId || !admin) return;
      try {
        const response = await fetch(`/api/user/deposit/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setActiveDeposit(data.activeDeposit || "");
          setLastDeposit(data.lastDeposit || "");
          setBalance(data.balance || "");
          setDailyReturn(data.dailyReturn || "");
          setTotalReturn(data.totalReturn || "");
          setPendingDeposit(data.pendingDeposit || "");
        } else {
          log.error("Error fetching deposit details");
          toast.error("Error fetching deposit details.");
        }
      } catch (error) {
        log.error("Error fetching deposit details:", error);
        toast.error("Error fetching deposit details.");
      }
    };

    const fetchWithdrawal = async () => {
      if (!userId || !admin) return;
      try {
        const response = await fetch(`/api/user/withdrawal/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setWithdrawalAmount(data.withdrawalAmount || "");
          setPendingWithdrawal(data.pendingWithdrawal || "");
          setLastWithdrawal(data.lastWithdrawal || "");
        } else {
          log.error("Error fetching withdrawal details");
          toast.error("Error fetching withdrawal details.");
        }
      } catch (error) {
        log.error("Error fetching withdrawal details:", error);
        toast.error("Error fetching withdrawal details.");
      }
    };

    const fetchAllData = async () => {
      setIsFetchingData(true);
      await Promise.all([fetchUser(), fetchDeposit(), fetchWithdrawal()]);
      setIsFetchingData(false);
    };

    if (userId && admin) {
      fetchAllData();
    }
  }, [userId, admin]);

  // Show skeleton during auth check, unauthorized access, or data fetching
  if (isCheckingAuth || !admin || isFetchingData) {
    return <Loading />;
  }

  // Validate userId
  if (!userId) {
    toast.error("Invalid or missing user ID. Please try again.");
    router.push("/admin/manage-investors");
    return null;
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/edit/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Successfully updated user details!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user details");
      }
    } catch (error: any) {
      log.error("Error updating user details:", error);
      toast.error(error.message || "Failed to update user details!");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitDeposit = async () => {
    setIsDepositing(true);
    try {
      const response = await fetch(`/api/user/deposit/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeDeposit,
          lastDeposit,
          balance,
          pendingDeposit,
        }),
      });

      if (response.ok) {
        toast.success("Deposit updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Deposit update failed");
      }
    } catch (error: any) {
      log.error("Error updating deposit:", error);
      toast.error(error.message || "Deposit update failed!");
    } finally {
      setIsDepositing(false);
    }
  };

  const onSubmitWithdrawal = async () => {
    setIsWithdrawing(true);
    try {
      const response = await fetch(`/api/user/withdrawal/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastWithdrawal,
          withdrawalAmount,
          pendingWithdrawal,
        }),
      });

      if (response.ok) {
        toast.success("Withdrawal updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Withdrawal update failed");
      }
    } catch (error: any) {
      log.error("Error updating withdrawal:", error);
      toast.error(error.message || "Withdrawal update failed!");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const rejectDeposit = async () => {
    setIsRejecting(true);
    try {
      const response = await fetch(`/api/user/deposit/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Deposit rejected successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Deposit rejection failed");
      }
    } catch (error: any) {
      log.error("Error rejecting deposit:", error);
      toast.error(error.message || "Deposit rejection failed!");
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Edit Investor
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Update user details, deposits, or withdrawals for the selected
            investor.
          </p>

          {/* User Details Section */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-xl font-semibold text-primary">User Details</h3>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="userId"
                className="text-sm font-semibold capitalize text-foreground"
              >
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={user?._id || ""}
                readOnly
                className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold capitalize text-foreground"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={user?.fullName || ""}
                readOnly
                className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm font-semibold capitalize text-foreground"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user?.username || ""}
                readOnly
                className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold capitalize text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="nationality"
                className="text-sm font-semibold capitalize text-foreground"
              >
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                value={user?.nationality || ""}
                readOnly
                className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="updatedPassword"
                className="text-sm font-semibold capitalize text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="updatedPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  aria-describedby={
                    errors.updatedPassword?.message
                      ? "updatedPassword-error"
                      : undefined
                  }
                  {...register("updatedPassword")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 hover:cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 hover:cursor-pointer" />
                  )}
                </button>
                {errors.updatedPassword?.message && (
                  <p
                    id="updatedPassword-error"
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {errors.updatedPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? <Spinner otherStyles="h-5 w-5 mx-auto" /> : "Update"}
            </button>
          </form>

          {/* Deposit Details Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-primary">
              Deposit Details
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="activeDeposit"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Active Deposit
                </label>
                <input
                  id="activeDeposit"
                  type="number"
                  value={activeDeposit || ""}
                  onChange={(e) => setActiveDeposit(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastDeposit"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Last Deposit
                </label>
                <input
                  id="lastDeposit"
                  type="number"
                  value={lastDeposit || ""}
                  onChange={(e) => setLastDeposit(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="balance"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Balance
                </label>
                <input
                  id="balance"
                  type="number"
                  value={balance || ""}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="dailyReturn"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Daily Return
                </label>
                <input
                  id="dailyReturn"
                  type="number"
                  value={dailyReturn || ""}
                  readOnly
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="totalReturn"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Total Return
                </label>
                <input
                  id="totalReturn"
                  type="number"
                  value={totalReturn || ""}
                  readOnly
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="pendingDeposit"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Pending Deposit
                </label>
                <input
                  id="pendingDeposit"
                  type="number"
                  value={pendingDeposit || ""}
                  onChange={(e) => setPendingDeposit(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={onSubmitDeposit}
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                disabled={isDepositing}
              >
                {isDepositing ? (
                  <Spinner otherStyles="h-5 w-5 mx-auto" />
                ) : (
                  "Update Deposit"
                )}
              </button>
              <button
                onClick={rejectDeposit}
                className="mt-2 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                disabled={isRejecting}
              >
                {isRejecting ? (
                  <Spinner otherStyles="h-5 w-5 mx-auto" />
                ) : (
                  "Reject Deposit"
                )}
              </button>
            </div>
          </div>

          {/* Withdrawal Details Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-primary">
              Withdrawal Details
            </h3>
            <form
              className="flex flex-col gap-4 mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitWithdrawal();
              }}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="withdrawalAmount"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Withdrawal Amount
                </label>
                <input
                  id="withdrawalAmount"
                  type="number"
                  value={withdrawalAmount || ""}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastWithdrawal"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Last Withdrawal
                </label>
                <input
                  id="lastWithdrawal"
                  type="number"
                  value={lastWithdrawal || ""}
                  onChange={(e) => setLastWithdrawal(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="pendingWithdrawal"
                  className="text-sm font-semibold capitalize text-foreground"
                >
                  Pending Withdrawal
                </label>
                <input
                  id="pendingWithdrawal"
                  type="number"
                  value={pendingWithdrawal || ""}
                  onChange={(e) => setPendingWithdrawal(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                disabled={isWithdrawing}
              >
                {isWithdrawing ? (
                  <Spinner otherStyles="h-5 w-5 mx-auto" />
                ) : (
                  "Update Withdrawal"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvestors;
