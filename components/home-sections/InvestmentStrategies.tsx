"use client";

import { useState, useEffect } from "react";
import { DollarSign, Building2, PieChart, LineChart, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME } from "@/lib/constants";

// Define the Strategy type for TypeScript
interface Strategy {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}

const investmentStrategiesData: Strategy[] = [
  {
    icon: DollarSign,
    title: "Loan Investments",
    description:
      "Lend your funds to vetted borrowers with competitive interest rates for steady, low-risk returns.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Invest in high-yield properties to generate passive income and achieve long-term asset growth.",
  },
  {
    icon: PieChart,
    title: "Crypto and Forex",
    description:
      "Maximize gains through strategic trading in dynamic cryptocurrency and forex markets.",
  },
  {
    icon: LineChart,
    title: "Stocks",
    description:
      "Grow your wealth with a diversified portfolio of equities targeting global market opportunities.",
  },
  {
    icon: Gem,
    title: "Precious Metals",
    description:
      "Secure your portfolio with investments in gold, silver, and other metals during market volatility.",
  },
];

const InvestmentStrategies: React.FC<{ id: string }> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % investmentStrategiesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Get the icon component
  const IconComponent = investmentStrategiesData[activeIndex].icon;

  return (
    <section id={id} className="relative bg-background py-16 text-foreground">
      {/* Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          How <span className="text-primary">{APP_NAME}</span> Grows Your Wealth
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our strategic investment approaches designed to maximize
          returns and secure your financial future.
        </p>
      </motion.div>

      {/* Carousel Navigation */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center gap-2 mb-8">
          {investmentStrategiesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-primary scale-125"
                  : "bg-gray-300 hover:bg-primary/50"
              }`}
            >
              <span className="sr-only">Select strategy {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Active Strategy Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-card/80 rounded-lg p-8 shadow-lg backdrop-blur-sm max-w-3xl mx-auto flex flex-col items-center gap-6 hover:shadow-xl hover:border-primary/50 border border-transparent transition-all"
          >
            <IconComponent
              className="h-12 w-12 text-primary"
              aria-hidden={true}
            />
            <h2 className="text-2xl font-semibold text-foreground text-center">
              {investmentStrategiesData[activeIndex].title}
            </h2>
            <p className="text-muted-foreground text-center">
              {investmentStrategiesData[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InvestmentStrategies;
