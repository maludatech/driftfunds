"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, Check, Wallet } from "lucide-react";
import SideNavbar from "@/components/shared/SideNavbar";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/shared/Spinner";
import { usePlanStore } from "@/store/usePlanStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import Loading from "./loading";
import { log } from "@/lib/logger";
import { APP_NAME } from "@/lib/constants";

type Plan = {
  name: string;
  deposit: string;
  investment_range: string;
  totalReturn: number;
  dailyReturn: number;
  minInvestment: number;
  maxInvestment: number;
  duration: number;
};

type WalletAddresses = {
  [key: string]: string;
};

const NewDeposit = ({
  params,
  callbackUrl = "/sign-in",
}: {
  params: { plan?: string };
  callbackUrl?: string;
}) => {
  const { user } = useAuthStore();
  const { selectedPlan, selectedCoin, totalAmount } = usePlanStore();
  const router = useRouter();
  const { theme } = useTheme();
  const userId = user?.userId;
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const walletAddresses: WalletAddresses = {
    Bitcoin: "bc1qdg3pzy5ltvzwsf437wtxhtyud5xncyz6p8ncwg",
    Ethereum: "0x97134a8c55b6ca60C7839d3353CBdBF9eC42314B",
  };

  // Dynamic SVG background
  const getSvgBackground = () => {
    const fillColor = theme === "dark" ? "%23fdfcff" : "%23030303";
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${fillColor}' fill-opacity='0.05' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 0 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`;
  };

  // Authentication and validation check
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access deposits.");
      router.push(callbackUrl);
    } else if (!params.plan) {
      toast.error("No plan specified. Please select a plan.");
      router.push("/deposit");
    } else if (!selectedPlan || !selectedCoin || !totalAmount) {
      toast.error("Missing deposit details. Please select a plan and coin.");
      router.push("/deposit");
    } else if (params.plan.toLowerCase() !== selectedPlan.name.toLowerCase()) {
      toast.error(
        "Selected plan does not match the URL. Please select the correct plan."
      );
      router.push("/deposit");
    }
    setIsCheckingAuth(false);
  }, [
    user,
    params.plan,
    selectedPlan,
    selectedCoin,
    totalAmount,
    router,
    callbackUrl,
    isCheckingAuth,
  ]);

  const handleCopy = () => {
    if (!selectedCoin) {
      toast.error("No cryptocurrency selected");
      return;
    }
    const address = walletAddresses[selectedCoin] || "";
    if (!address) {
      toast.error("Invalid wallet address for selected coin");
      return;
    }
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    toast.success("Address copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirmDeposit = async () => {
    if (!userId || !selectedPlan || !selectedCoin || !totalAmount) {
      toast.error("Incomplete deposit information. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/deposit/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendingDeposit: totalAmount,
          selectedCoin,
          selectedPlan: selectedPlan.name,
          dailyReturn: Number(totalAmount) * (selectedPlan.dailyReturn / 100),
          startDate: new Date(),
          endDate: new Date(
            new Date().setDate(new Date().getDate() + selectedPlan.duration)
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Deposit failed");
      }

      toast.success("Deposit successful! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error: any) {
      log.error("Deposit error:", error);
      toast.error(error.message || "Deposit failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show skeleton during auth check or invalid state
  if (
    isCheckingAuth ||
    !user ||
    !selectedPlan ||
    !selectedCoin ||
    !totalAmount ||
    !params.plan
  ) {
    return <Loading />;
  }

  // Capitalize plan name for display
  const planName = params.plan.charAt(0).toUpperCase() + params.plan.slice(1);

  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        <SideNavbar />
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-4 p-1 w-full">
          {/* Heading */}
          <h1 className="text-2xl first-letter:uppercase font-bold text-primary">
            New Deposit - {planName} Plan
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete the deposit by sending the specified amount to the provided
            wallet address.
          </p>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* Deposit Details */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
            <h2 className="text-xl font-bold text-primary mb-4 text-center">
              {planName} Plan Deposit
            </h2>
            <div
              className="flex flex-col gap-4 items-center"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <p className="text-lg font-medium text-center">
                Please send{" "}
                <span className="font-extrabold">{totalAmount} USD</span> in{" "}
                {selectedCoin} to the address below to fund your account.
              </p>
              <p className="text-sm text-muted-foreground text-center max-w-xl">
                Copy the wallet address, make the transaction in your crypto
                wallet, then confirm the deposit below.
              </p>
              <p className="text-sm text-muted-foreground">
                You have <span className="font-bold">30 minutes</span> to
                initiate the transaction.
              </p>
              <Link
                href="/deposit"
                className="text-sm text-red-500 hover:underline hover:text-red-600"
              >
                Cancel transaction
              </Link>

              {/* Wallet Address */}
              <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-card/80">
                <div className="flex items-center gap-2 text-sm sm:text-base font-medium break-all">
                  <Wallet className="h-5 w-5 text-gray-500" />
                  {walletAddresses[selectedCoin] || "No address available"}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Confirm Deposit Button */}
              <button
                onClick={handleConfirmDeposit}
                disabled={isLoading}
                className="w-full flex justify-center items-center px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition-opacity disabled:opacity-50 hover:cursor-pointer"
              >
                {isLoading ? (
                  <Spinner otherStyles="h-5 w-5" />
                ) : (
                  "Confirm Deposit"
                )}
              </button>

              {/* Instructions */}
              <div className="flex flex-col gap-2 text-sm text-muted-foreground max-w-xl text-center">
                <p>
                  {APP_NAME} will monitor your deposit and confirm it
                  automatically. You’ll be redirected to the dashboard once
                  verified.
                </p>
                <p>
                  If not redirected after the deposit, return to the{" "}
                  <Link
                    href="/dashboard"
                    className="text-primary hover:underline"
                  >
                    dashboard
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDeposit;
