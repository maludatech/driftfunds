"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { APP_NAME } from "@/lib/constants";

// Define the Plan type for TypeScript
interface Plan {
  name: string;
  deposit: string;
  investment_range: string;
  totalReturn: number;
  dailyReturn: number;
  minInvestment: number;
  maxInvestment: number;
  duration: number;
  list_item1: string;
  list_item2: string;
}

const Plans: Plan[] = [
  {
    name: "BASIC",
    deposit: "100",
    investment_range: "$100-$999",
    totalReturn: 15,
    dailyReturn: 1.5,
    minInvestment: 100,
    maxInvestment: 999,
    duration: 10,
    list_item1: "Instant payout",
    list_item2: "Unlimited Support",
  },
  {
    name: "PLATINUM",
    deposit: "1000",
    investment_range: "$1000-$4,999",
    totalReturn: 30,
    dailyReturn: 2,
    minInvestment: 1000,
    maxInvestment: 4999,
    duration: 15,
    list_item1: "Instant payout",
    list_item2: "Unlimited Support",
  },
  {
    name: "SILVER",
    deposit: "5,000",
    investment_range: "$5,000-$9,999",
    totalReturn: 50,
    dailyReturn: 2.5,
    minInvestment: 5000,
    maxInvestment: 9999,
    duration: 20,
    list_item1: "Instant payout",
    list_item2: "Unlimited Support",
  },
  {
    name: "GOLD",
    deposit: "10,000",
    investment_range: "$10,000-$50,000",
    totalReturn: 60,
    dailyReturn: 3,
    minInvestment: 10000,
    maxInvestment: 50000,
    duration: 20,
    list_item1: "Instant payout",
    list_item2: "Unlimited Support",
  },
  {
    name: "VIP",
    deposit: "50,000",
    investment_range: "$50,000-UNLIMITED",
    totalReturn: 100,
    dailyReturn: 5,
    minInvestment: 50000,
    maxInvestment: 1000000000,
    duration: 20,
    list_item1: "Instant payout",
    list_item2: "Unlimited Support",
  },
];

const InvestmentPlans: React.FC<{ id: string }> = ({ id }) => {
  const { user } = useAuthStore();
  const [activePlan, setActivePlan] = useState<number | null>(null);

  // Animation Variants
  const cardVariants = {
    inactive: { scale: 0.95, opacity: 0.8, y: 0 },
    active: { scale: 1, opacity: 1, y: -10, transition: { duration: 0.3 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id={id} className="relative bg-background py-16 text-foreground">
      {/* Animated Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={headerVariants}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Choose Your <span className="text-primary">Investment Plan</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock your financial potential with {APP_NAME}’s tailored investment
          plans designed for every level of investor.
        </p>
      </motion.div>

      {/* Stacked Cards */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              animate={activePlan === index ? "active" : "inactive"}
              onHoverStart={() => setActivePlan(index)}
              onHoverEnd={() => setActivePlan(null)}
              className="relative flex flex-col items-center rounded-lg bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm border border-transparent hover:border-primary/50 transition-all"
            >
              {/* Plan Name Badge */}
              <span className="absolute -top-3 bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                {plan.name}
              </span>
              {/* Plan Details */}
              <h2 className="text-2xl font-bold text-primary mt-6">
                <sup>$</sup>
                {plan.deposit}
              </h2>
              <h3 className="text-lg text-foreground mb-4">
                {plan.totalReturn}% Total Return
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
                <li>Range: {plan.investment_range}</li>
                <li>Duration: {plan.duration} Days</li>
                <li>Daily Return: {plan.dailyReturn}%</li>
                <li>{plan.list_item1}</li>
                <li>{plan.list_item2}</li>
              </ul>
              <Link
                href={user ? "/deposit" : "/sign-in"}
                className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/80 transition-transform transform hover:scale-105"
              >
                Invest Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
