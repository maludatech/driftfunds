"use client";

import { ChevronRight } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { APP_DOMAIN_SHORT, APP_EMAIL, APP_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";

const HomePageFooter = () => {
  const { user } = useAuthStore();
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  return (
    <footer className=" w-full rounded-lg bg-background shadow-lg px-6 py-16 backdrop-blur-sm dark:shadow-gray-800 relative">
      <div className="body-container flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-12 sm:gap-6 sm:flex-row justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-orbitron text-primary">
              {APP_NAME}
            </h1>
            <address className="not-italic text-[16px] text-muted-foreground">
              {APP_NAME} Plc, 456 Blockchain Avenue, New York, USA
            </address>
            <div className="flex flex-col mt-2">
              <p className="text-[16px] text-muted-foreground">
                <a
                  href="tel:+12125550198"
                  className="hover:underline hover:text-primary transition-colors duration-300"
                >
                  +1 212 555 0198
                </a>
              </p>
              <p className="text-[16px] text-muted-foreground">
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="hover:underline hover:text-primary transition-colors duration-300"
                >
                  info@{APP_DOMAIN_SHORT.toLowerCase()}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-semibold">Useful Links</h2>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "#about", label: "About us" },
                { href: "#services", label: "Services" },
                { href: "/terms-of-service", label: "Terms of service" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((link, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 hover:underline text-[16px] text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold text-foreground">
              Our Newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your email to get updates from us
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Email"
                className="p-3 w-full rounded-l-lg bg-background border border-gray-300 dark:border-gray-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary dark:bg-primary text-white px-4 py-3 rounded-r-lg hover:opacity-90 transition-opacity duration-300 hover:cursor-pointer"
                onClick={() => router.push(user ? "/contact" : "/sign-in")}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom section with copyright */}
        <div className="mt-8 flex justify-center items-center gap-1 text-sm text-muted-foreground">
          <p>
            © {currentYear}{" "}
            <strong className="text-foreground">{APP_NAME}</strong>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomePageFooter;
