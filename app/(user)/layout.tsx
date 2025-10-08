import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import LanguageTranslator from "@/components/shared/LanguageTranslator";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientThemeProvider>
      <main>
        <Navbar />
        {children}
        <Toaster richColors />
        <LanguageTranslator />
      </main>
    </ClientThemeProvider>
  );
}
