"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-36">
      <div className="max-w-md w-full flex flex-col gap-6 items-center">
        <Image
          src={"/assets/images/404.webp"}
          alt="Not Found"
          width={400}
          height={400}
          className="object-contain"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
