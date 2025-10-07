"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bitcoin,
  Coins as Ethereum,
  CreditCard,
  ClockArrowUp,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/useAuthStore";
import SideNavbar from "@/components/shared/SideNavbar";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/shared/Spinner";
import Loading from "./loading";
import { log } from "@/lib/logger";

const Coins = [
  { name: "Bitcoin", icon: Bitcoin, color: "text-yellow-500" },
  { name: "Ethereum", icon: Ethereum, color: "text-blue-900" },
];

const Withdrawal = ({ callbackUrl = "/sign-in" }: { callbackUrl?: string }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { theme } = useTheme();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [amountToWithdraw, setAmountToWithdraw] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountBalance, setAccountBalance] = useState<string>("0");
  const [approvedWithdrawal, setApprovedWithdrawal] = useState<string>("0");
  const [pendingWithdrawal, setPendingWithdrawal] = useState<string>("0");

  // Authentication check
  useEffect(() => {
    if (!user && !isCheckingAuth) {
      toast.error("Please sign in to access withdrawals.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [user, router, callbackUrl, isCheckingAuth]);

  const userId = user?.userId;

  const getSvgBackground = () => {
    const fillColor = theme === "dark" ? "%23fdfcff" : "%23030303";
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${fillColor}' fill-opacity='0.05' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.2zm0 16a5 5 0 1 1 0-2H304v34h-42.2zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 0 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`;
  };

  // Fetch withdrawal details from backend
  const fetchWithdrawal = async () => {
    try {
      const response = await fetch(`/api/user/withdrawal/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setApprovedWithdrawal(data.withdrawalAmount || "0");
        setPendingWithdrawal(data.pendingWithdrawal || "0");
      } else {
        log.error("Error fetching withdrawal details");
      }
    } catch (error) {
      log.error("Error fetching withdrawal details: ", error);
    }
  };

  // Fetch deposit details from backend
  const fetchDeposit = async () => {
    try {
      const response = await fetch(`/api/user/deposit/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAccountBalance(data.balance || "0");
      } else {
        log.error("Error fetching deposit details");
      }
    } catch (error) {
      log.error("Error fetching deposit details", error);
    }
  };

  // Effect to fetch withdrawal and deposit details on mount
  useEffect(() => {
    if (user && user.userId) {
      fetchWithdrawal();
      fetchDeposit();
    }
  }, [user]);

  if (isCheckingAuth || !user) {
    return <Loading />;
  }

  // Handle withdrawal submission
  const handleSubmit = async () => {
    const amount = parseFloat(amountToWithdraw);

    // Validate required fields
    if (!amountToWithdraw || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid withdrawal amount (minimum $10).");
      return;
    }

    if (amount < 10) {
      toast.error("Amount is not up to minimum withdrawal ($10).");
      return;
    }

    if (Number(amount) > Number(accountBalance)) {
      toast.error("Insufficient funds for this withdrawal.");
      return;
    }

    if (!walletAddress || walletAddress.trim() === "") {
      toast.error("Please provide a valid wallet address.");
      return;
    }

    if (!selectedCoin) {
      toast.error("Please select a coin type before proceeding.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`/api/user/withdrawal/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendingWithdrawal: amountToWithdraw,
          selectedCoin: selectedCoin,
          walletAddress: walletAddress,
        }),
      });

      if (!response.ok) {
        toast.error("Withdrawal confirmation error");
        return;
      }

      toast.success("Withdrawal sent successfully and awaiting approval!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Withdrawal confirmation error");
    } finally {
      setAmountToWithdraw("");
      setWalletAddress("");
      setSelectedCoin(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        <SideNavbar />
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-4 p-1 w-full">
          {/* Heading */}
          <h1 className="text-2xl first-letter:uppercase font-bold text-primary">
            New Withdrawal
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the amount, select a cryptocurrency, and provide a wallet
            address to proceed with your withdrawal.
          </p>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* Balance and Withdrawal Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Account Balance */}
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-6 w-6 text-yellow-300" />
                <h3 className="text-lg font-bold text-primary">
                  Account Balance
                </h3>
              </div>
              <p className="text-xl font-bold text-foreground">
                $ {accountBalance}
              </p>
            </div>
            {/* Pending Withdrawal */}
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <ClockArrowUp className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-bold text-primary">
                  Pending Withdrawal
                </h3>
              </div>
              <p className="text-xl font-bold text-foreground">
                $ {pendingWithdrawal}
              </p>
            </div>
            {/* Approved Withdrawal */}
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-bold text-primary">
                  Approved Withdrawal
                </h3>
              </div>
              <p className="text-xl font-bold text-foreground">
                $ {approvedWithdrawal}
              </p>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mt-6">
            <h2 className="text-xl font-bold text-primary mb-4">
              Withdrawal Details
            </h2>
            <div className="flex flex-col gap-4">
              {/* Amount Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Withdrawal Amount
                </label>
                <input
                  type="number"
                  min="10"
                  value={amountToWithdraw}
                  onChange={(e) => setAmountToWithdraw(e.target.value)}
                  placeholder="Enter amount (min $10)"
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              {/* Wallet Address */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              {/* Coin Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Select Cryptocurrency
                </label>
                <div className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600">
                  {Coins.map((coin, idx) => {
                    const Icon = coin.icon;
                    return (
                      <div key={idx} className="flex items-center mb-2">
                        <input
                          id={coin.name.toLowerCase()}
                          name="coin"
                          type="radio"
                          className="w-4 h-4 text-primary bg-gray-100 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
                          checked={selectedCoin === coin.name}
                          onChange={() => setSelectedCoin(coin.name)}
                        />
                        <label
                          htmlFor={coin.name.toLowerCase()}
                          className="ms-2 text-lg flex gap-2 items-center font-medium text-foreground"
                        >
                          <Icon className={`h-5 w-5 ${coin.color}`} />
                          {coin.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 hover:cursor-pointer text-center"
              >
                {isLoading ? (
                  <Spinner otherStyles="h-5 w-5" />
                ) : (
                  "Confirm Withdrawal"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
