"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ThemeToggle from "@/theme/Theme-toggle";
import { APP_NAME, APP_LOGO_URL } from "@/lib/constants";
import { useAdminStore } from "@/store/useAdminStore";

const AdminNavbar = () => {
  const { admin, logout } = useAdminStore();
  const router = useRouter();

  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
      toast.success("Signed out successfully");
      router.push("/admin-panel/sign-in");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Navigation links
  const loggedInLinks = [
    { href: "/admin-panel/dashboard", label: "Dashboard" },
    { href: "/admin-panel/change-password", label: "Change Password" },
    { href: "/admin-panel/send-email", label: "Send Email" },
    { href: "/admin-panel/view-investors", label: "View Investors" },
    { href: "/admin-panel/manage-investors", label: "Manage Investors" },
  ];

  return (
    <nav
      className="fixed top-0 z-20 h-16 p-3 w-full bg-card/80 backdrop-blur-sm shadow-md dark:shadow-gray-800"
      role="navigation"
      aria-label="Admin navigation"
    >
      <div className="body-container flex justify-between w-full items-center">
        {/* Left container */}
        <div className="flex">
          <Link
            href={admin ? "/admin-panel/dashboard" : "/admin-panel/sign-in"}
            className="flex items-center gap-2"
          >
            <Image
              src={APP_LOGO_URL}
              width={30}
              height={30}
              alt={`${APP_NAME} logo`}
            />
            <h1 className="sm:flex bg-gradient-to-r from-slate-800 to-slate-400 dark:from-slate-200 dark:to-slate-600 text-transparent bg-clip-text animate-gradient font-bold text-lg sm:text-xl">
              {APP_NAME}
            </h1>
          </Link>
        </div>

        {/* Middle container */}
        <div className="flex gap-1 items-center uppercase">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4">
            {admin && (
              <div className="items-center text-sm flex gap-4">
                {loggedInLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground font-semibold hover:underline hover:text-primary ease-in-out duration-200 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex relative lg:hidden font-semibold text-sm">
            {admin ? (
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {toggleDropDown ? (
                  <X
                    className="size-8 text-muted-foreground hover:text-slate-400 hover:cursor-pointer ease-in-out duration-300 transition"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                  />
                ) : (
                  <Menu
                    className="size-8 text-muted-foreground hover:text-slate-400 hover:cursor-pointer ease-in-out duration-300 transition"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                  />
                )}
                {toggleDropDown && (
                  <div className="dropdown text-sm">
                    {loggedInLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setToggleDropDown(!toggleDropDown)}
                        className="transition duration-300 ease-in-out group-hover:underline-offset-8 hover:underline hover:text-primary hover:cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      className="rounded-lg bg-primary p-3 text-[13px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 transition uppercase hover:cursor-pointer"
                      disabled={isLoggingOut}
                      onClick={() => {
                        handleLogout();
                        setToggleDropDown(!toggleDropDown);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {toggleDropDown ? (
                  <X
                    className="size-8 text-muted-foreground hover:text-slate-400 hover:cursor-pointer ease-in-out duration-300 transition"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                  />
                ) : (
                  <Menu
                    className="size-8 text-muted-foreground hover:text-slate-400 hover:cursor-pointer ease-in-out duration-300 transition"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                  />
                )}
                {toggleDropDown && (
                  <div className="dropdown text-sm">
                    <button
                      className="rounded-lg bg-primary p-3 text-[13px] font-semibold text-white hover:opacity-90 transition uppercase hover:cursor-pointer"
                      onClick={() => {
                        router.push("/admin-panel/sign-in");
                        setToggleDropDown(!toggleDropDown);
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Container */}
        <div className="hidden lg:flex gap-4">
          {admin ? (
            <div className="items-center flex gap-4">
              <ThemeToggle />
              <button
                className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 transition uppercase hover:cursor-pointer"
                disabled={isLoggingOut}
                onClick={() => handleLogout()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="items-center flex gap-4">
              <ThemeToggle />
              <button
                className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition uppercase hover:cursor-pointer"
                onClick={() => router.push("/admin-panel/sign-in")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
