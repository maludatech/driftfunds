"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserTable from "@/components/UserTable";
import { useAdminStore } from "@/store/useAdminStore";
import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import Loading from "./loading";

const ViewInvestors = ({
  callbackUrl = "/admin/sign-in",
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();
  const { admin } = useAdminStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Authentication check
  useEffect(() => {
    if (!admin) {
      toast.error("Please sign in as an admin to access this page.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [admin, router, callbackUrl, isCheckingAuth]);

  // Show skeleton during auth check or for unauthenticated admins
  if (isCheckingAuth || !admin) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-background body-container p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-fit">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            View Investors
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Browse and manage all registered investors in the system.
          </p>

          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl">All Users</h1>
            <button
              onClick={() => router.refresh()}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
            >
              Refresh
            </button>
          </div>
          <UserTable length={100} />
        </div>
      </div>
    </div>
  );
};

export default ViewInvestors;
