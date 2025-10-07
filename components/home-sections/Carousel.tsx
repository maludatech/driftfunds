"use client";
import { useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface CarouselProps {
  children: ReactNode[];
}

const Carousel = ({ children: slides }: CarouselProps) => {
  const [curr, setCurr] = useState<number>(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative mb-3 body-container">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 mt-3">
            {slide}
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4 hover:text-white">
        <button
          className="p-1 rounded-full bg-slate-100 opacity-70 text-gray-800 hover:opacity-100 hover:cursor-pointer z-10"
          onClick={prev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          className="p-1 rounded-full bg-slate-100 opacity-70 text-gray-800 hover:opacity-100 hover:cursor-pointer z-10"
          onClick={next}
          aria-label="Next Slide"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
