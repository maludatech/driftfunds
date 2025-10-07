"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  HandCoins,
  User,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/useAuthStore";
import SideNavbar from "@/components/shared/SideNavbar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Loading from "./loading";
import { log } from "@/lib/logger";
import { APP_DOMAIN } from "@/lib/constants";

const Dashboard = ({ callbackUrl = "/sign-in" }: { callbackUrl?: string }) => {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [totalWithdrawal, setTotalWithdrawal] = useState<number>(0);
  const [lastDeposit, setLastDeposit] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [activeDeposit, setActiveDeposit] = useState<number>(0);
  const [pendingDeposit, setPendingDeposit] = useState<number>(0);
  const [totalReferral, setTotalReferral] = useState<string>("0");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [investmentPlan, setInvestmentPlan] = useState<string>("none");
  const [qrcode, setQRCode] = useState("");

  // Dynamic SVG background function
  const getSvgBackground = () => {
    const fillColor = theme === "dark" ? "%23fdfcff" : "%23030303";
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${fillColor}' fill-opacity='0.05' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 0 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 1 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`;
  };

  // Authentication check
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access the dashboard.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [user, router, callbackUrl, isCheckingAuth]);

  const userId = user?.userId;

  const fetchWithdrawal = async () => {
    if (!userId) {
      toast.error("User ID not found. Please sign in again.");
      return;
    }
    try {
      const response = await fetch(`/api/user/withdrawal/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTotalWithdrawal(data.withdrawalAmount || 0);
      } else {
        toast.error("Failed to fetch withdrawal details.");
      }
    } catch (error) {
      log.error("Error fetching withdrawal details:", error);
      toast.error("Error fetching withdrawal details.");
    }
  };

  const fetchDeposit = async () => {
    if (!userId) {
      toast.error("User ID not found. Please sign in again.");
      return;
    }
    try {
      const response = await fetch(`/api/user/deposit/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setActiveDeposit(data.activeDeposit || 0);
        setLastDeposit(data.lastDeposit || 0);
        setBalance(data.balance || 0);
        setProfit(data.totalReturn || 0);
        setPendingDeposit(data.pendingDeposit || 0);
        setInvestmentPlan(data.plan || "none");
        setStartDate(data.startDate ? new Date(data.startDate) : undefined);
        setEndDate(data.endDate ? new Date(data.endDate) : undefined);
      } else {
        toast.error("Failed to fetch deposit details.");
      }
    } catch (error) {
      log.error("Error fetching deposit details:", error);
      toast.error("Error fetching deposit details.");
    }
  };

  const fetchReferrals = async () => {
    if (!userId) {
      toast.error("User ID not found. Please sign in again.");
      return;
    }
    try {
      const response = await fetch(`/api/user/referral/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTotalReferral(data.totalReferral || "0");
      } else {
        toast.error("Failed to fetch referral details.");
      }
    } catch (error) {
      log.error("Error fetching referral details:", error);
      toast.error("Error fetching referral details.");
    }
  };

  const generate = () => {
    if (user?.referralCode) {
      QRCode.toDataURL(
        `${APP_DOMAIN}/sign-up?referral=${user.referralCode}`
      )
        .then((value) => setQRCode(value))
        .catch((err) => {
          log.error("QR Code generation failed:", err);
          toast.error("Failed to generate QR code.");
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetchWithdrawal();
      fetchDeposit();
      fetchReferrals();
      generate();
    }
  }, [user]);

  // Show skeleton during auth check or for unauthenticated users
  if (isCheckingAuth || !user) {
    return <Loading />;
  }

  // Function to format the date
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

  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        <SideNavbar />
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-1 justify-center p-1 w-full">
          <h1 className="text-2xl first-letter:uppercase font-bold text-primary">
            {user?.username}'s Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back! Manage your account, deposits, and referrals below.
          </p>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 py-6">
            <div
              className="rounded-lg bg-card/80 p-4 shadow-md hover:shadow-lg transition-shadow"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">User</p>
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-primary">
                  {user?.username}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div
              className="rounded-lg bg-primary p-4 shadow-md hover:shadow-lg transition-shadow text-white"
              style={{
                backgroundImage: getSvgBackground(),
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Auto Trading Bot</p>
              </div>
              <div className="mt-2">
                <Link
                  href="/deposit"
                  className="text-xl font-bold hover:underline"
                >
                  Start Trade
                </Link>
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
                <p className="text-sm font-semibold text-foreground">Balance</p>
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-primary">
                  ${balance.toFixed(2)}
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
                  Withdrawals
                </p>
                <HandCoins className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-primary">
                  ${totalWithdrawal.toFixed(2)}
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
                  Referrals
                </p>
                <Users className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-primary">
                  {totalReferral}
                </p>
              </div>
            </div>
          </div>

          {/* Referral link section */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mb-6">
            <h2 className="text-xl font-bold text-primary">
              Referral Link
            </h2>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Referral Link
              </p>
            </div>
            <div className="flex gap-2 items-center flex-col sm:flex-row">
              <div className="flex flex-col gap-2 sm:flex-row flex-nowrap sm:items-center w-full">
                <input
                  className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={`${APP_DOMAIN}/sign-up?referral=${user?.referralCode}`}
                  readOnly
                />
              </div>
              <div className="h-full">
                {qrcode ? (
                  <Image src={qrcode} width={100} height={100} alt="QR Code" />
                ) : (
                  <div className="w-[100px] h-[100px] flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg bg-card/80 shadow-lg backdrop-blur-sm dark:shadow-gray-800 py-2 gap-4">
            <h2 className="text-xl font-bold text-primary px-6">
              Deposit Information
            </h2>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between p-2 bg-black dark:bg-white w-full px-4 dark:text-black text-white">
                <h1 className="font-semibold">Deposit</h1>
                <h1 className="font-semibold">Amount</h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Active Deposit</h1>
                <h1 className="font-semibold text-start w-fit pr-12">
                  ${activeDeposit.toFixed(2)}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Last Deposit</h1>
                <h1 className="font-semibold text-start w-fit pr-8">
                  ${lastDeposit.toFixed(2)}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Pending Deposit</h1>
                <h1 className="font-semibold text-start w-fit pr-[63px]">
                  ${pendingDeposit.toFixed(2)}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Investment Plan</h1>
                <h1 className="font-semibold text-start w-fit pr-14 lowercase first-letter:uppercase">
                  {investmentPlan}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Profit</h1>
                <h1 className="font-semibold text-start w-fit pl-5">
                  ${profit.toFixed(2)}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">Start Date</h1>
                <h1 className="font-semibold text-start w-fit pr-3">
                  {formatDate(startDate)}
                </h1>
                <h1></h1>
              </div>
              <div className="flex justify-between p-2 w-full">
                <h1 className="font-semibold pl-3">End Date</h1>
                <h1 className="font-semibold text-start w-fit pr-1">
                  {formatDate(endDate)}
                </h1>
                <h1></h1>
              </div>
              <div className="px-4 pb-4">
                <Link href="/deposit">
                  <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 hover:cursor-pointer">
                    Make Deposit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
