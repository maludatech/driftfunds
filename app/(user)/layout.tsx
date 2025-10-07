import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Rubik } from "next/font/google";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import LanguageTranslator from "@/components/shared/LanguageTranslator";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SLOGAN,
  APP_DOMAIN,
} from "@/lib/constants";

export const metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_DOMAIN,
    siteName: APP_NAME,
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/assets/images/og-image.png"],
  },
};

const rubik = Rubik({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${rubik.className}`}>
        <ClientThemeProvider>
          <main>
            <Navbar />
            {children}
            <Toaster richColors />
            <LanguageTranslator />
          </main>
          <Analytics />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
