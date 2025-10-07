"use client";

import { APP_DOMAIN_SHORT, APP_EMAIL, APP_NAME } from "@/lib/constants";
import Link from "next/link";

// Structured content for privacy policy
const privacyContent = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      `At ${APP_NAME}, protecting your personal information is our top priority. We are committed to maintaining the confidentiality and security of your data using advanced technologies to prevent unauthorized access and breaches.`,
      `This Privacy Policy outlines how we collect, use, and protect your data. For additional details, refer to our <a href="/terms-of-service" class="underline hover:text-primary">Terms & Conditions</a>.`,
    ],
  },
  {
    id: "personal-information",
    title: "Types of Personal Information We Collect",
    content: [
      "We collect the following personal information with your explicit consent:",
      [
        "Full Name",
        "Location details",
        "Personal account information for electronic currencies",
        "Login credentials (email and password)",
      ],
      "This information is securely stored and used only for providing our services.",
    ],
  },
  {
    id: "automatically-collected",
    title: "Information Automatically Collected",
    content: [
      "When you visit our website, we collect the following data, which may qualify as personal information:",
      [
        "Your IP address",
        "Details about your Internet Service Provider",
        "Your geographical location and country of residence",
        "Browser and operating system specifications",
      ],
    ],
  },
  {
    id: "data-handling",
    title: "How We Handle Your Data",
    content: [
      `All collected data is stored securely on our internal servers without third-party involvement. We comply with applicable regulations and dispose of data properly.`,
      `We do not sell, trade, transfer, or disclose your information to third parties without your explicit consent, unless required to provide a requested service or product.`,
      `Payment information, such as credit card details, is not stored on our servers. It is encrypted and handled by trusted payment gateway providers.`,
      `The email address provided during an order is used solely for processing your request and sending relevant updates.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      `If you have questions about how we collect, store, or manage your personal data, please contact us via email at <a href="mailto:support@${APP_EMAIL}" class="underline hover:text-primary">support@${APP_DOMAIN_SHORT}</a>.`,
      "We are committed to addressing your concerns and ensuring your information is handled with care.",
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
      <h1 className="mb-6 text-2xl font-bold text-primary">{title}</h1>
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

const PrivacyPolicy = () => {
  return (
    <LegalLayout title={`Privacy Policy | ${APP_NAME}`}>
      <div id="main-content">
        {/* Table of Contents */}
        <TableOfContents sections={privacyContent} />

        {/* Privacy Sections */}
        <div className="space-y-8">
          {privacyContent.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {section.title}
              </h2>
              {section.content.map((content, index) =>
                Array.isArray(content) ? (
                  <ul
                    key={index}
                    className="my-2 list-disc space-y-2 pl-6"
                    aria-labelledby={section.id}
                  >
                    {content.map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-base text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={index}
                    className="text-base text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
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

export default PrivacyPolicy;
