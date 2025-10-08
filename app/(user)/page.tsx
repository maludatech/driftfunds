"use client";

import Script from "next/script";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";

// Lazy-load heavy components
const About = dynamic(() => import("@/components/home-sections/About"), {
  ssr: false,
});
const Services = dynamic(() => import("@/components/home-sections/Services"), {
  ssr: false,
});
const InvestmentStrategies = dynamic(
  () => import("@/components/home-sections/InvestmentStrategies"),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("@/components/home-sections/Testimonials"),
  { ssr: false }
);
const InvestmentPlans = dynamic(
  () => import("@/components/home-sections/InvestmentPlans"),
  { ssr: false }
);
const Teams = dynamic(() => import("@/components/home-sections/Team"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/home-sections/Contact"), {
  ssr: false,
});
const HomePageFooter = dynamic(
  () => import("@/components/home-sections/HomepageFooter"),
  { ssr: false }
);

// Structured sections
const sections = [
  { id: "about", Component: About },
  { id: "services", Component: Services },
  { id: "investment-strategies", Component: InvestmentStrategies },
  { id: "investment-plans", Component: InvestmentPlans },
  { id: "testimonials", Component: Testimonials },
  { id: "team", Component: Teams },
  { id: "contact", Component: Contact },
];

// Reusable HomeLayout component
const HomeLayout = ({ children }: { children: React.ReactNode }) => (
  <main
    className="flex flex-col bg-background text-foreground z-0"
    role="main"
    aria-labelledby="hero-heading"
  >
    {children}
  </main>
);

export default function Home() {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is resolved after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until hydration to avoid mismatch
  if (!mounted) {
    return null;
  }

  return (
    <HomeLayout>
      <div>
        {/* Hero Section */}
        <section className="relative flex min-h-screen w-full items-center justify-start overflow-hidden">
          {/* Video Background with Image Fallback */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src={"/assets/videos/hero-video.mp4"}
            className="absolute inset-0 h-full w-full object-cover z-0"
            poster="/assets/images/hero-fallback-image.png"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          {/* Content */}
          <div className="relative z-20 mx-auto max-w-7xl px-6 py-16 w-full md:w-1/2">
            {/* Badge */}
            <span className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white mb-6 shadow-md">
              Empower Your Financial Future
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Take Control with <span className="">{APP_NAME}</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-200 max-w-lg mb-8">
              Discover a smarter way to manage and grow your crypto investments
              with cutting-edge tools and trusted strategies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={user ? "/dashboard" : "/sign-up"}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/80 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
              >
                Start Investing Now
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 hover:border-white/80 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Sections */}

        {sections.map(({ id, Component }) => (
          <Component id={id} key={id} />
        ))}

        {/* Footer */}
        <HomePageFooter />

        {/* Smartsupp Live Chat Script */}
        <Script id="smartsupp-chat" strategy="lazyOnload">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'e3474b14a38df0476501048cb0ad7914ec61c4bd';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
        <noscript>
          JavaScript is disabled. Live chat is unavailable. Please contact us at{" "}
          <a
            href={`mailto:support@${APP_NAME.toLowerCase()}.com`}
            className="underline"
          >
            support@{APP_NAME.toLowerCase()}.com
          </a>
          .
        </noscript>
      </div>
    </HomeLayout>
  );
}
