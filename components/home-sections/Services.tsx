"use client";

import { useState } from "react";
import {
  Laptop,
  LineChart,
  Book,
  Briefcase,
  ListCheck,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME } from "@/lib/constants";

// Define the Service type for TypeScript
interface Service {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    icon: Laptop,
    title: "Crypto Asset Management",
    description:
      "Expertly manage your cryptocurrency portfolio with tailored asset selection, risk management, and seamless trading execution for optimal returns.",
  },
  {
    icon: LineChart,
    title: "Crypto Trading",
    description:
      "Trade and invest in cryptocurrencies effortlessly on our intuitive platform, designed for beginners and seasoned investors alike.",
  },
  {
    icon: Book,
    title: "Crypto Education",
    description:
      "Master blockchain and trading with our comprehensive courses, webinars, and articles crafted to elevate your investment knowledge.",
  },
  {
    icon: Briefcase,
    title: "Crypto Custody",
    description:
      "Store your cryptocurrencies securely with our expert custodians, leveraging top-tier security to protect your digital assets.",
  },
  {
    icon: ListCheck,
    title: "Crypto Consulting",
    description:
      "Get personalized guidance from our experts on choosing exchanges and crafting investment strategies tailored to your goals.",
  },
  {
    icon: Clock,
    title: "Crypto Research",
    description:
      "Stay ahead with our analysts’ market insights and detailed reports to make informed, data-driven investment decisions.",
  },
];

const Services: React.FC<{ id: string }> = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  // Get the icon component
  const IconComponent = servicesData[activeTab].icon;

  return (
    <section id={id} className="relative bg-background py-16 text-foreground">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent py-12 mb-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore how {APP_NAME} empowers your crypto journey with
            cutting-edge tools and expert support.
          </p>
        </div>
      </div>

      {/* Tabbed Interface */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {servicesData.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === index
                  ? "bg-primary text-white"
                  : "bg-card/80 text-foreground hover:bg-primary/10"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Active Service Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-card/80 rounded-lg p-6 shadow-lg backdrop-blur-sm max-w-3xl mx-auto flex items-start gap-6"
          >
            <IconComponent
              className="h-12 w-12 text-primary flex-shrink-0"
              aria-hidden={true} // Changed to boolean
            />
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {servicesData[activeTab].title}
              </h2>
              <p className="text-muted-foreground">
                {servicesData[activeTab].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
