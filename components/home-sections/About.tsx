"use client";

import { useState, useEffect } from "react";
import { Users, GitBranch, Clock, Award, CheckCheck } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

const About = ({ id }: { id: string }) => {
  const [investors, setInvestors] = useState(0);
  const [branches, setBranches] = useState(0);
  const [awards, setAwards] = useState(0);

  const ImageUrls = [
    "/assets/images/home/clients/client-1.webp",
    "/assets/images/home/clients/client-2.webp",
    "/assets/images/home/clients/client-3.webp",
    "/assets/images/home/clients/client-4.webp",
    "/assets/images/home/clients/client-5.webp",
    "/assets/images/home/clients/client-6.webp",
  ];

  // Investor Section - Countdown from 0 to the updated number of investors
  useEffect(() => {
    let targetValue = 1200;
    let increment = targetValue / (500 / 10);

    const updateCountdown = () => {
      if (investors > 987) {
        targetValue = investors;
        increment = targetValue / (500 / 10);
      }
      if (investors < targetValue) {
        setInvestors((prevCount) =>
          Math.floor(Math.min(prevCount + increment, targetValue))
        );
      }
    };

    const interval = setInterval(updateCountdown, 10);
    return () => clearInterval(interval);
  }, [investors]);

  // Branches Section
  useEffect(() => {
    const duration = 100;
    const increment = 12 / (duration / 10);

    const interval = setInterval(() => {
      if (branches < 12) {
        setBranches((prevCount) =>
          Math.floor(Math.min(prevCount + increment, 12))
        );
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [branches]);

  // Awards Section
  useEffect(() => {
    const duration = 100;
    const increment = 13 / (duration / 10);

    const interval = setInterval(() => {
      if (awards < 13) {
        setAwards((prevCount) =>
          Math.floor(Math.min(prevCount + increment, 13))
        );
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [awards]);

  return (
    <section
      id={id}
      className="flex min-h-screen flex-col gap-8 bg-background py-8 text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
          <div className="grid grid-cols-2 gap-5 sm:flex sm:justify-between font-semibold text-primary">
            {/* Investors */}
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg">{investors}+</h1>
                <p className="text-sm sm:text-base">Investors</p>
              </div>
            </div>

            {/* Branches */}
            <div className="flex items-center gap-3">
              <GitBranch className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg">{branches}</h1>
                <p className="text-sm sm:text-base">Branches</p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg">Decades</h1>
                <p className="text-sm sm:text-base">of Experience</p>
              </div>
            </div>

            {/* Awards */}
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg">{awards}</h1>
                <p className="text-sm sm:text-base">Awards</p>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="w-full">
              <Image
                src="/assets/images/home/about-image.jpg"
                alt="about image"
                height={500}
                width={500}
                className="rounded-lg object-contain w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Versatile Asset Hub
              </h1>
              <p className="italic text-muted-foreground">
                {APP_NAME} introduces an innovative investment platform, uniting
                diverse assets within a framework of social collaboration and
                investor enlightenment. Our community serves as a nexus for
                users to connect, exchange insights, and enrich their knowledge.
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Consistent Expansion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-5 w-5 text-primary" />
                  <span className="text-foreground">
                    Dependable Infrastructure
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Optimal Efficiency</span>
                </li>
              </ul>
              <p className="italic text-muted-foreground">
                {APP_NAME} offers access to over 2000 financial assets,
                including stocks, cryptocurrencies, ETFs, and more. Investors
                can trade with or without leverage across short, mid, and
                long-term opportunities. Visit our Trade Services page for
                details. Join a thriving community where users connect, share
                knowledge, and learn together.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-card/80 shadow-lg">
            <Image
              src="/assets/images/home/about/about-boxes-1.webp"
              alt="mission image"
              height={400}
              width={400}
              className="rounded-t-lg w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-center text-xl font-semibold text-foreground">
                Our Mission
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Our commitment is to deliver unparalleled service to each of our
                customers and clients, ensuring that every facet of your
                investment portfolio is meticulously crafted using the latest
                market capitalization data. We are dedicated to providing you
                with top-notch service at all times.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-card/80 shadow-lg">
            <Image
              src="/assets/images/home/about/about-boxes-2.webp"
              alt="guarantees image"
              height={400}
              width={400}
              className="rounded-t-lg w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-center text-xl font-semibold text-foreground">
                Our Guarantees
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {APP_NAME} operates under stringent regulation by both the FCA
                and CySec. Furthermore, your invested funds are safeguarded by
                our comprehensive insurance policy, ensuring the safety of your
                capital without any concerns of loss.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-card/80 shadow-lg">
            <Image
              src="/assets/images/home/about/about-boxes-3.webp"
              alt="vision image"
              height={400}
              width={400}
              className="rounded-t-lg w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-center text-xl font-semibold text-foreground">
                Our Vision
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Empowering a Worldwide Community of Investors. {APP_NAME} stands
                as a pioneering global social investment network, dedicated to
                reshaping the landscape of investing and enriching the financial
                knowledge of investors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-y bg-card/80 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4">
          {ImageUrls.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`client-${index + 1}`}
              height={100}
              width={100}
              className="grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
