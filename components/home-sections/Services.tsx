"use client";

import {
  Laptop,
  LineChart,
  Book,
  Briefcase,
  ListCheck,
  Clock,
} from "lucide-react";

const servicesData = [
  {
    icon: Laptop,
    title: "Crypto Asset Management",
    description:
      "This service provides comprehensive portfolio management for cryptocurrencies, including asset selection, risk management, and trading execution.",
  },
  {
    icon: LineChart,
    title: "Crypto Trading",
    description:
      "This service allows you to trade and invest in cryptocurrencies through the company's platform. The platform is designed to be user-friendly and easy to use, even for beginners.",
  },
  {
    icon: Book,
    title: "Crypto Education",
    description:
      "The company offers a variety of courses, webinars, and articles that cover topics such as blockchain technology, cryptocurrency trading, and investment strategies.",
  },
  {
    icon: Briefcase,
    title: "Crypto Custody",
    description:
      "This service provides secure storage for your cryptocurrencies. The company's custodians are experts in security and have a proven track record of protecting digital assets.",
  },
  {
    icon: ListCheck,
    title: "Crypto Consulting",
    description:
      "The company's team of experts can help you with everything from choosing a cryptocurrency exchange to developing an investment strategy.",
  },
  {
    icon: Clock,
    title: "Crypto Research",
    description:
      "The company's team of analysts tracks market trends and developments, and publishes reports that help you make informed investment decisions.",
  },
];

const Services = ({ id }: { id: string }) => {
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
              Services
            </h1>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              Check our Services
            </h2>
          </div>

          {/* Services List */}
          <div className="grid gap-6 sm:grid-cols-2">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="flex rounded-lg bg-card/80 p-4 shadow-lg backdrop-blur-sm gap-4"
              >
                <service.icon
                  className="h-10 w-10 text-primary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-primary">
                    {service.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
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

export default Services;
