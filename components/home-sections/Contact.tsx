"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { APP_DOMAIN_SHORT, APP_EMAIL, APP_NAME } from "@/lib/constants";

// Define ContactInfo type for TypeScript
interface ContactInfo {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  content: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Our Address",
    content: `${APP_NAME} Plc, 456 Blockchain Avenue, New York, USA`,
  },
  {
    icon: Mail,
    title: "Email Us",
    content: `info@${APP_DOMAIN_SHORT}`,
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 212 555 0198",
  },
];

const Contact: React.FC<{ id: string }> = ({ id }) => {
  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    rest: { scale: 1, y: 0, opacity: 0.9 },
    hover: {
      scale: 1.05,
      y: -8,
      opacity: 1,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id={id}
      className="relative bg-gradient-to-b from-primary/10 to-background py-16 text-foreground"
      aria-label="Contact Section"
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
          Connect with <span className="text-primary">{APP_NAME}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Reach out to our team for personalized support and start your
          financial journey today.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial="rest"
                whileHover="hover"
                variants={cardVariants}
                className="flex flex-col items-center rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm border border-transparent hover:border-primary/50 transition-all"
              >
                <Icon
                  className="h-10 w-10 text-primary mb-4"
                  aria-hidden={true}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {info.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form Teaser */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Have a Question?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Send us a message, and our team will get back to you within 24
            hours.
          </p>
          <a
            href={`mailto:${APP_EMAIL}`}
            className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/80 transition-transform transform hover:scale-105"
          >
            Send a Message
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
