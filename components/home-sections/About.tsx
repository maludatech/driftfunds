"use client";

import { useState, useEffect } from "react";
import { Users, GitBranch, Clock, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { motion } from "framer-motion";

// Define props interface for TypeScript
interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const [investors, setInvestors] = useState(0);
  const [branches, setBranches] = useState(0);
  const [awards, setAwards] = useState(0);

  const clientLogos = [
    "/assets/images/home/clients/client-1.webp",
    "/assets/images/home/clients/client-2.webp",
    "/assets/images/home/clients/client-3.webp",
    "/assets/images/home/clients/client-4.webp",
    "/assets/images/home/clients/client-5.webp",
    "/assets/images/home/clients/client-6.webp",
  ];

  // Stats Animation
  useEffect(() => {
    const animateCounter = (
      setCounter: (value: number) => void,
      target: number,
      duration: number
    ) => {
      const increment = target / (duration / 10);
      let current = 0;

      const interval = setInterval(() => {
        if (current < target) {
          current = Math.min(current + increment, target);
          setCounter(Math.floor(current));
        } else {
          clearInterval(interval);
        }
      }, 10);

      return () => clearInterval(interval);
    };

    animateCounter(setInvestors, 1200, 1500);
    animateCounter(setBranches, 12, 1000);
    animateCounter(setAwards, 13, 1000);
  }, []);

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id={id} className="relative bg-background py-16 text-foreground">
      <div className="container mx-auto">
        {/* Hero-like Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="text-center mb-12 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Empowering Wealth Creation with{" "}
            <span className="text-[var(--color-primary)]">{APP_NAME}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {APP_NAME} is your gateway to a global community of investors,
            offering innovative tools and a collaborative platform to grow your
            wealth with confidence.
          </p>
        </motion.div>

        {/* Circular Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-6">
          {[
            { value: investors, label: "Investors", icon: Users, suffix: "+" },
            { value: branches, label: "Branches", icon: GitBranch },
            { value: awards, label: "Awards", icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-[var(--color-primary)]"
                    strokeWidth="8"
                    strokeDasharray={`${(stat.value / (stat.label === "Investors" ? 1200 : 15)) * 276.5} 276.5`}
                    strokeDashoffset="0"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-[var(--color-primary)]" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {stat.value}
                {stat.suffix || ""}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline for Milestones */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="px-6 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[var(--color-primary)]"></div>
            <div className="space-y-8">
              {[
                {
                  year: "2015",
                  title: "Founded " + APP_NAME,
                  desc: "Launched as a pioneering platform for crypto and asset trading.",
                },
                {
                  year: "2018",
                  title: "Global Expansion",
                  desc: "Opened 12 branches worldwide to serve a growing community.",
                },
                {
                  year: "2023",
                  title: "Award-Winning Platform",
                  desc: "Received 13 industry awards for innovation and reliability.",
                },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <h3 className="text-xl font-semibold text-foreground">
                      {milestone.year}
                    </h3>
                    <h4 className="text-lg font-medium text-[var(--color-primary)]">
                      {milestone.title}
                    </h4>
                    <p className="text-muted-foreground">{milestone.desc}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values with Checkmarks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="px-6 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Choose {APP_NAME}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Community-Driven",
                desc: "Join a global network of investors sharing insights.",
              },
              {
                title: "Regulated & Secure",
                desc: "FCA and CySec regulated with insured funds.",
              },
              {
                title: "Diverse Assets",
                desc: "Access over 2000 assets, from crypto to ETFs.",
              },
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-[var(--color-primary)] flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client Logo Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Trusted by Industry Leaders
          </h2>
          <div className="relative mt-8 border-y bg-card/80 py-2">
            <div className="flex animate-slide">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  alt={`client-${(index % clientLogos.length) + 1}`}
                  height={80}
                  width={80}
                  className="mx-8 grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
