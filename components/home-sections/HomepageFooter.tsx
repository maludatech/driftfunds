"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { APP_DOMAIN_SHORT, APP_EMAIL, APP_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";

// Define Link type for TypeScript
interface FooterLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const HomePageFooter: React.FC = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleSubscribe = () => {
    if (email) {
      router.push(user ? "/contact" : "/sign-in");
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-primary/10 to-background px-6 py-16 text-foreground">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="body-container mx-auto max-w-7xl flex flex-col gap-12"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Branding Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold font-orbitron text-primary">
              {APP_NAME}
            </h1>
            <address className="not-italic text-sm text-muted-foreground">
              {APP_NAME} Plc, 456 Blockchain Avenue, New York, USA
            </address>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+12125550198"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                +1 212 555 0198
              </a>
              <a
                href={`mailto:${APP_EMAIL}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                info@{APP_DOMAIN_SHORT.toLowerCase()}
              </a>
            </div>
          </motion.div>

          {/* Useful Links Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Useful Links
            </h2>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-muted-foreground group"
                >
                  <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              Our Newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for the latest updates from {APP_NAME}.
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 flex-1 rounded-l-lg bg-background border border-gray-300 dark:border-gray-600 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="rounded-r-lg bg-primary text-white px-4 py-3 font-semibold hover:bg-primary/80 transition-transform transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center gap-1 text-sm text-muted-foreground border-t border-gray-300 dark:border-gray-600 pt-6"
        >
          <p>
            © {currentYear}{" "}
            <strong className="text-foreground">{APP_NAME}</strong>. All Rights
            Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default HomePageFooter;
