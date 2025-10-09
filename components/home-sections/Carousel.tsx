"use client";

import { useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define props interface for TypeScript
interface CarouselProps {
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children: slides }) => {
  const [curr, setCurr] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-rotation every 4 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurr((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  // Animation Variants
  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="relative body-container mb-12">
      {/* Slide Container */}
      <div className="relative overflow-hidden pb-12">
        {" "}
        {/* Added pb-12 for dot space */}
        <AnimatePresence mode="wait">
          <motion.div
            key={curr}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex-shrink-0"
          >
            {slides[curr]}
          </motion.div>
        </AnimatePresence>
        {/* Carousel Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-primary/80 text-white hover:bg-primary transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden={true} />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-primary/80 text-white hover:bg-primary transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-8 w-8" aria-hidden={true} />
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurr(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              curr === index
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
