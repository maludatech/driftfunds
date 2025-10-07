"use client";

import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

// Structured content for terms
const termsContent = [
  {
    id: "general-rules",
    title: "General Rules",
    content: [
      `Welcome to ${APP_NAME}! These terms and conditions outline the rules governing your relationship with us, crafted in accordance with international law and established business practices.`,
      `${APP_NAME} is open to individuals aged 18 and above. To participate in our services, you must complete a registration process. By signing up, you agree to comply with these terms.`,
      "Please read these terms carefully before engaging with our services. For any questions, contact our customer support team.",
    ],
  },
  {
    id: "investment-rules",
    title: "Investment Rules",
    content: [
      `Every deposit at ${APP_NAME} is a confidential transaction between us and our clients. You are responsible for processing transactions with due diligence and at your own risk.`,
      "We offer two investment plans:",
      [
        "<strong>After Plan</strong>: Interest is calculated and credited at the end of the investment term.",
        "<strong>Daily Plan</strong>: Interest accrues daily throughout the investment period.",
      ],
      "Review your investment choices carefully and consider consulting a financial advisor to align with your financial goals.",
    ],
  },
];

// Reusable LegalLayout component
const LegalLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <main className="flex min-h-screen items-center justify-center bg-background p-4 pt-24 text-foreground">
    <div className="w-full max-w-3xl rounded-lg bg-card/80 p-8 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-primary">
        {title}
      </h1>
      {children}
    </div>
  </main>
);

// Table of Contents component
const TableOfContents = ({
  sections,
}: {
  sections: { id: string; title: string }[];
}) => (
  <nav className="mb-8 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <h2 className="mb-3 text-lg font-semibold text-foreground">
      Table of Contents
    </h2>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <Link
            href={`#${section.id}`}
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            {section.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const TermsOfService = () => {
  return (
    <LegalLayout title={`Terms & Conditions | ${APP_NAME}`}>
      <div id="main-content">
        {/* Table of Contents */}
        <TableOfContents sections={termsContent} />

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsContent.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              {section.content.map((content, index) =>
                Array.isArray(content) ? (
                  <ul key={index} className="my-2 list-disc space-y-2 pl-6">
                    {content.map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-base text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                ) : (
                  <p key={index} className="text-base text-muted-foreground">
                    {content}
                  </p>
                )
              )}
            </section>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions? Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Contact Support
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground underline hover:text-primary hover:underline-offset-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
