"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Landmark,
  HandCoins,
  MessageCircleQuestion,
} from "lucide-react";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathName = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/deposit", icon: Landmark, label: "Deposit" },
    { href: "/withdrawal", icon: HandCoins, label: "Withdrawal" },
    { href: "/contact", icon: MessageCircleQuestion, label: "Help Desk" },
  ];

  return (
    <div className="bg-card shadow-md dark:shadow-gray-800 w-[200px] lg:flex flex-col fixed left-0 top-0 h-full hidden py-8 pt-[30vh] px-6 overflow-y-auto text-muted-foreground font-medium">
      <div className="flex flex-col gap-6 sm:gap-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathName === item.href ||
            (item.href === "/deposit" && pathName.includes("/deposit")) ||
            (item.href === "/withdrawal" && pathName.includes("/withdrawal")) ||
            (item.href === "/profile" && pathName.includes("/profile"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "bg-primary text-white shadow-md flex gap-2 p-2 rounded-md font-[630] items-center hover:opacity-90"
                  : "hover:underline hover:text-primary flex gap-2 items-center duration-300 ease-in-out transition"
              }
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "text-white" : "text-primary"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavbar;
