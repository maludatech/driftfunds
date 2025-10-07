"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const Plans = [
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

const InvestmentPlans = ({ id }: { id: string }) => {
  const { user } = useAuthStore();

  return (
    <section
      id={id}
      className="flex flex-col gap-8 bg-background p-4 pb-16 text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold uppercase text-foreground sm:text-xl">
            Investment Plans
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Plans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm"
              >
                <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                  {plan.name}
                </h1>
                <h4 className="mt-2 text-xl text-foreground">
                  <span className="text-2xl sm:text-3xl">
                    <sup>$</sup>
                    <span className="text-primary">{plan.deposit}</span>
                  </span>
                  /{plan.totalReturn}% profit
                </h4>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                  <li>Investment range: {plan.investment_range}</li>
                  <li>Duration: {plan.duration} Days</li>
                  <li>Daily Return: {plan.dailyReturn}%</li>
                  <li>{plan.list_item1}</li>
                  <li>{plan.list_item2}</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href={user ? "/deposit" : "/sign-in"}
                    className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 dark:bg-[var(--color-primary)] dark:hover:opacity-90"
                  >
                    Invest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
