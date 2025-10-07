"use client";

import Link from "next/link";
import { LayoutDashboard, Lock, Mail, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const AdminSideNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin-panel/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    { href: "/admin-panel/change-password", icon: Lock, label: "Security" },
    { href: "/admin-panel/send-email", icon: Mail, label: "Email" },
    {
      href: "/admin-panel/view-investors",
      icon: Users,
      label: "View Investors",
    },
    {
      href: "/admin-panel/manage-investors",
      icon: Settings,
      label: "Manage Investors",
    },
  ];

  return (
    <div className="bg-card shadow-md dark:shadow-gray-800 w-[200px] lg:flex flex-col fixed left-0 top-0 h-full hidden py-8 pt-[30vh] px-6 overflow-y-auto text-muted-foreground font-medium">
      <div className="flex flex-col gap-6 sm:gap-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "bg-primary text-white shadow-md flex gap-2 p-2 rounded-md font-semibold items-center hover:opacity-90"
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

export default AdminSideNavbar;
