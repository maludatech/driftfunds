"use client";

import { DollarSign, Building2, PieChart, LineChart, Gem } from "lucide-react";

const investmentStrategiesData = [
  {
    icon: DollarSign,
    title: "Loan Investments",
    description:
      "Your funds are lent to vetted borrowers with competitive interest rates, ensuring steady returns and minimal risk.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "We invest in high-yield commercial and residential properties, generating passive income and long-term asset growth.",
  },
  {
    icon: PieChart,
    title: "Crypto and Forex",
    description:
      "Through strategic trading in cryptocurrency and forex markets, we aim to maximize short-term and long-term gains.",
  },
  {
    icon: LineChart,
    title: "Stocks",
    description:
      "Our experts manage a diversified portfolio of equities, targeting growth opportunities in global stock markets.",
  },
  {
    icon: Gem,
    title: "Precious Metals",
    description:
      "We invest in gold, silver, and other precious metals, providing a safe haven during volatile market conditions.",
  },
];

const InvestmentStrategies = ({ id }: { id: string }) => {
  return (
    <section
      id={id}
      className="flex flex-col gap-8 bg-background p-4 py-8 text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold uppercase text-foreground sm:text-xl">
              Investment Strategies
            </h1>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              How We Grow Your Wealth
            </h2>
          </div>

          {/* Strategies List */}
          <div className="grid gap-6 sm:grid-cols-2">
            {investmentStrategiesData.map((strategy, index) => (
              <div
                key={index}
                className="flex rounded-lg bg-card/80 p-4 shadow-lg backdrop-blur-sm gap-4"
              >
                <strategy.icon
                  className="h-10 w-10 text-primary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-primary">
                    {strategy.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {strategy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentStrategies;
