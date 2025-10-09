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
    quote:
      "I was hesitant about crypto, but {APP_NAME}’s expertise and clear guidance helped me build a diversified portfolio that fits my risk tolerance. My investments are in great hands!",
  },
  {
    image: "/assets/images/home/testimonials/testimonials-2.jpg",
    name: "Ashley Wood",
    location: "Miami, Florida, USA",
    flag: "/assets/images/home/country-flags/USA.png",
    flagAlt: "flag_usa",
    quote:
      "Working with {APP_NAME} has been a game-changer. Their market insights and support have helped me achieve my financial goals, and I keep recommending them to everyone!",
  },
  {
    image: "/assets/images/home/testimonials/testimonials-3.jpg",
    name: "Mohammed Faraydoon",
    location: "East Azarbaijan, Iran",
    flag: "/assets/images/home/country-flags/Iran.png",
    flagAlt: "flag_iran",
    quote:
      "I made mistakes investing on my own, but {APP_NAME} guided me onto the right path with their expert advice and strategies.",
  },
  {
    image: "/assets/images/home/testimonials/testimonials-4.jpg",
    name: "Susan Moldovan",
    location: "Toronto, Canada",
    flag: "/assets/images/home/country-flags/Canada.png",
    flagAlt: "flag_canada",
    quote:
      "Great company with top-notch investment services. {APP_NAME} keeps delivering, and I’m thrilled with their work!",
  },
  {
    image: "/assets/images/home/testimonials/testimonials-5.jpg",
    name: "Jeff Watter",
    location: "California, USA",
    flag: "/assets/images/home/country-flags/USA.png",
    flagAlt: "flag_usa",
    quote:
      "By far the best investment platform this year. {APP_NAME} built me a solid portfolio and provides ongoing support. I’m planning to invest even more!",
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
