"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { APP_NAME } from "@/lib/constants";

// Define TeamMember type for TypeScript
interface TeamMember {
  imageUrl: string;
  name: string;
  position: string;
}

const teamMembers: TeamMember[] = [
  {
    imageUrl: "/assets/images/home/team/team1.webp",
    name: "Jason Campbell",
    position: "Chief Executive Officer (CEO)",
  },
  {
    imageUrl: "/assets/images/home/team/team2.webp",
    name: "Chloe Wilson",
    position: "Chief Financial Officer (CFO)",
  },
  {
    imageUrl: "/assets/images/home/team/team3.webp",
    name: "Liam Adams",
    position: "Chief Technology Officer (CTO)",
  },
];

const Teams: React.FC<{ id: string }> = ({ id }) => {
  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    rest: { scale: 1, y: 0, opacity: 0.9 },
    hover: {
      scale: 1.05,
      y: -10,
      opacity: 1,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

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
          Meet the <span className="text-primary">{APP_NAME} Team</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Our dedicated experts drive {APP_NAME}’s mission to empower your
          financial success.
        </p>
      </motion.div>

      {/* Team Members Grid */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((teamMember, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              variants={cardVariants}
              className="relative flex flex-col items-center rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm border border-transparent hover:border-primary/50 transition-all"
            >
              <Image
                src={teamMember.imageUrl}
                width={300}
                height={300}
                alt={`${teamMember.name} - ${teamMember.position}`}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground">
                {teamMember.name}
              </h3>
              <p className="text-sm text-muted-foreground italic">
                {teamMember.position}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
