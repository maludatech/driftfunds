"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { APP_NAME } from "@/lib/constants";
import Carousel from "./Carousel";

// Define Testimonial type for TypeScript
interface Testimonial {
  image: string;
  name: string;
  location: string;
  flag: string;
  flagAlt: string;
  quote: string;
}

const testimonialsData: Testimonial[] = [
  {
    image: "/assets/images/home/testimonials/testimonials-1.jpg",
    name: "Josue Arellano",
    location: "Mexico City, Mexico",
    flag: "/assets/images/home/country-flags/mexico.png",
    flagAlt: "flag_mexico",
    quote: `When I first dipped my toes into crypto, I was overwhelmed and skeptical, unsure if I could navigate the volatile market. ${APP_NAME} changed everything for me. Their team took the time to understand my financial goals and risk tolerance, crafting a diversified portfolio that feels secure and tailored to my needs. Their clear, step-by-step guidance and ongoing support have given me confidence, and I’ve seen consistent growth in my investments. I couldn’t ask for a better partner on this journey!`,
  },
  {
    image: "/assets/images/home/testimonials/testimonials-2.jpg",
    name: "Ashley Wood",
    location: "Miami, Florida, USA",
    flag: "/assets/images/home/country-flags/USA.png",
    flagAlt: "flag_usa",
    quote: `Partnering with ${APP_NAME} has been a total game-changer for my financial future. Their deep market insights and personalized strategies helped me not only achieve but surpass my investment goals. What stands out most is their incredible support—they’re always there to answer questions and provide updates, making me feel like a valued client. I’ve recommended ${APP_NAME} to my friends and family because their expertise and dedication are unmatched. I’m excited to see where this partnership takes me next!`,
  },
  {
    image: "/assets/images/home/testimonials/testimonials-3.jpg",
    name: "Mohammed Faraydoon",
    location: "East Azarbaijan, Iran",
    flag: "/assets/images/home/country-flags/Iran.png",
    flagAlt: "flag_iran",
    quote: `I made some costly mistakes trying to invest in cryptocurrencies on my own, losing money due to poor decisions and market volatility. That’s when I turned to ${APP_NAME}, and it was a turning point. Their expert advisors took the time to educate me, walking me through tailored strategies that aligned with my financial aspirations. Their platform is intuitive, and their insights have helped me rebuild my portfolio with confidence. Thanks to ${APP_NAME}, I’m now on a solid path to financial growth, and I feel supported every step of the way.`,
  },
  {
    image: "/assets/images/home/testimonials/testimonials-4.jpg",
    name: "Susan Moldovan",
    location: "Toronto, Canada",
    flag: "/assets/images/home/country-flags/Canada.png",
    flagAlt: "flag_canada",
    quote: `${APP_NAME} is hands-down one of the best investment companies I’ve ever worked with. Their professionalism and top-notch services have exceeded my expectations at every turn. From the moment I signed up, their team provided clear, actionable advice that helped me diversify my investments and maximize returns. What I appreciate most is their transparency and commitment to keeping me informed. I’m thrilled with the results and look forward to continuing this partnership for years to come!`,
  },
  {
    image: "/assets/images/home/testimonials/testimonials-5.jpg",
    name: "Jeff Watter",
    location: "California, USA",
    flag: "/assets/images/home/country-flags/USA.png",
    flagAlt: "flag_usa",
    quote: `I’ve tried several investment platforms over the years, but ${APP_NAME} stands out as the best by far. Their team built me a robust, diversified portfolio that perfectly balances risk and reward, and their ongoing support has been phenomenal. Whether it’s answering my questions or providing market updates, they’re always one step ahead. The results speak for themselves—I’ve seen impressive growth, and I’m already planning to increase my investments with them. If you’re serious about wealth-building, ${APP_NAME} is the way to go!`,
  },
];

const Testimonials: React.FC<{ id: string }> = ({ id }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is resolved after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until hydration
  if (!mounted) {
    return null;
  }

  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const slideContent = testimonialsData.map((testimonial, index) => (
    <div key={index} className="w-full text-foreground">
      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <Image
          src={testimonial.image}
          height={100}
          width={100}
          alt={`testimonial_${testimonial.name}`}
          className="rounded-full border-4 border-primary/50"
        />
        <h3 className="text-xl font-semibold text-foreground">
          {testimonial.name}
        </h3>
        <div className="flex items-center gap-2">
          <h4 className="text-sm text-muted-foreground">
            {testimonial.location}
          </h4>
          <Image
            src={testimonial.flag}
            height={24}
            width={24}
            alt={testimonial.flagAlt}
            className="rounded-sm"
          />
        </div>
        <p className="text-sm text-foreground relative px-6">
          <Quote
            className="absolute top-0 left-2 h-5 w-5 text-primary rotate-180"
            aria-hidden={true}
          />
          {testimonial.quote.replace("{APP_NAME}", APP_NAME)}
          <Quote
            className="absolute bottom-0 right-2 h-5 w-5 text-primary"
            aria-hidden={true}
          />
        </p>
      </div>
    </div>
  ));

  return (
    <section
      id={id}
      className="relative bg-gradient-to-b from-primary/10 to-background py-16 text-foreground"
    >
      {/* Animated Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={headerVariants}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-6 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          What Our <span className="text-primary">Clients Say</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Hear from our global community about how {APP_NAME} has transformed
          their financial journey.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="mx-auto max-w-7xl px-6">
        <Carousel>{slideContent}</Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
