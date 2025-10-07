import Image from "next/image";
import Carousel from "./Carousel";
import { Quote } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/lib/constants";

const slides = [
  <div className="w-full text-foreground" key="slide-1">
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src="/assets/images/home/testimonials/testimonials-1.webp"
        height={100}
        width={100}
        alt="testimonial_Investor_1"
        className="rounded-full border-4 border-gray-600"
      />
      <h3 className="text-md font-semibold">Alejandro Luis</h3>
      <div className="flex items-center gap-2">
        <h4>Mexico City, Mexico</h4>
        <Image
          src="/assets/images/home/country-flags/mexico.png"
          height={30}
          width={30}
          alt="flag_mexico"
        />
      </div>
      <p>
        <span className="text-sm">
          <Quote
            className="inline-block h-5 w-5 text-primary ml-1 rotate-180"
            aria-hidden="true"
          />
          I was looking for a way to invest in cryptocurrency, but I was
          hesitant because I didn't know much about it. I came across {APP_NAME} and was impressed with their knowledge and expertise. They took the
          time to explain everything to me in a way that I could understand, and
          they helped me to create a diversified portfolio that met my risk
          tolerance. I'm so glad I chose {APP_NAME}, and I'm confident that my
          cryptocurrency investments are in good hands.
          <Quote
            className="inline-block h-5 w-5 text-primary mr-1"
            aria-hidden="true"
          />
        </span>
      </p>
    </div>
  </div>,

  <div className="w-full text-foreground" key="slide-2">
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src="/assets/images/home/testimonials/testimonials-2.webp"
        height={100}
        width={100}
        alt="testimonial_Investor_2"
        className="rounded-full border-4 border-gray-600"
      />
      <h3 className="text-md font-semibold">Sandy Wood</h3>
      <div className="flex items-center gap-2">
        <h4>Miami, Florida, USA</h4>
        <Image
          src="/assets/images/home/country-flags/USA.png"
          height={30}
          width={30}
          alt="flag_usa"
        />
      </div>
      <p>
        <span className="text-sm">
          <Quote
            className="inline-block h-5 w-5 text-primary ml-1 rotate-180"
            aria-hidden="true"
          />
          I've been working with {APP_NAME} for the past few years, and I'm so
          impressed with their financial services. They're always up-to-date on
          the latest market trends, and they're always willing to go the extra
          mile to help me achieve my financial goals. I'm so confident in their
          abilities that I keep recommending them to my friends and family.
          <Quote
            className="inline-block h-5 w-5 text-primary mr-1"
            aria-hidden="true"
          />
        </span>
      </p>
    </div>
  </div>,

  <div className="w-full text-foreground" key="slide-3">
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src="/assets/images/home/testimonials/testimonials-3.webp"
        height={100}
        width={100}
        alt="testimonial_Investor_3"
        className="rounded-full border-4 border-gray-600"
      />
      <h3 className="text-md font-semibold">Mohammed Rezarajabi</h3>
      <div className="flex items-center gap-2">
        <h4>East Azarbaijan, Iran</h4>
        <Image
          src="/assets/images/home/country-flags/Iran.png"
          height={30}
          width={30}
          alt="flag_iran"
        />
      </div>
      <p>
        <span className="text-sm">
          <Quote
            className="inline-block h-5 w-5 text-primary ml-1 rotate-180"
            aria-hidden="true"
          />
          I have been making mistakes while investing over the years, but {APP_NAME} has been able to guide me on the right path.
          <Quote
            className="inline-block h-5 w-5 text-primary mr-1"
            aria-hidden="true"
          />
        </span>
      </p>
    </div>
  </div>,

  <div className="w-full text-foreground" key="slide-4">
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src="/assets/images/home/testimonials/testimonials-4.webp"
        height={100}
        width={100}
        alt="testimonial_Investor_4"
        className="rounded-full border-4 border-gray-600"
      />
      <h3 className="text-md font-semibold">Susan Moldovan</h3>
      <div className="flex items-center gap-2">
        <h4>Toronto, Canada</h4>
        <Image
          src="/assets/images/home/country-flags/Canada.png"
          height={30}
          width={30}
          alt="flag_canada"
        />
      </div>
      <p>
        <span className="text-sm">
          <Quote
            className="inline-block h-5 w-5 text-primary ml-1 rotate-180"
            aria-hidden="true"
          />
          Great company with great investment services. Keep up the good work.
          <Quote
            className="inline-block h-5 w-5 text-primary mr-1"
            aria-hidden="true"
          />
        </span>
      </p>
    </div>
  </div>,

  <div className="w-full text-foreground" key="slide-5">
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src="/assets/images/home/testimonials/testimonials-5.webp"
        height={100}
        width={100}
        alt="testimonial_Investor_5"
        className="rounded-full border-4 border-gray-600"
      />
      <h3 className="text-md font-semibold">Jeff Watter</h3>
      <div className="flex items-center gap-2">
        <h4>California, USA</h4>
        <Image
          src="/assets/images/home/country-flags/USA.png"
          height={30}
          width={30}
          alt="flag_usa"
        />
      </div>
      <p>
        <span className="text-sm">
          <Quote
            className="inline-block h-5 w-5 text-primary ml-1 rotate-180"
            aria-hidden="true"
          />
          I've made a lot of investments this year, but {APP_NAME} is by far the
          best. They helped me to create a diversified portfolio that met my
          risk tolerance, and they've been providing me with excellent advice
          and support ever since. I'm so confident in their abilities that I'm
          planning to invest even more with them in the future.
          <Quote
            className="inline-block h-5 w-5 text-primary mr-1"
            aria-hidden="true"
          />
        </span>
      </p>
    </div>
  </div>,
];

const Testimonials = ({ id }: { id: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is resolved after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const getSvgBackground = () => {
    const fillColor = theme === "dark" ? "%23fdfcff" : "%23030303"; // White for dark, black for light
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${fillColor}' fill-opacity='0.05' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 1 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`;
  };

  // Prevent rendering until hydration to avoid mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div
      id={id}
      className="bg-card/80 shadow-lg backdrop-blur-sm p-5 mb-16 w-full text-foreground"
      style={{
        backgroundImage: getSvgBackground(),
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div className="flex flex-col gap-2 body-container">
        <h1 className="text-lg font-bold uppercase text-foreground sm:text-xl">
          Testimonials
        </h1>
        <p className="text-sm mb-4 font-medium">
          Our expertise in financial services has bettered the lives of our
          clients greatly, their testimony has encouraged us greatly.
        </p>
      </div>
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
