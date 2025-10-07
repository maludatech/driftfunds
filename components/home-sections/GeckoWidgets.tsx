"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GeckoWidget = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const widgetTheme = resolvedTheme === "dark" ? "true" : "false";

  useEffect(() => {
    // Dynamically load the CoinGecko widget script after darkMode is defined
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-list-widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="body-container flex w-full pt-20 px-3 sm:px-8">
      {mounted && (
        <div
          dangerouslySetInnerHTML={{
            __html: `<gecko-coin-list-widget locale="en" dark-mode="${widgetTheme}" outlined="true" coin-ids="" initial-currency="usd"></gecko-coin-list-widget>`,
          }}
          className="w-full"
        />
      )}
    </div>
  );
};

export default GeckoWidget;
