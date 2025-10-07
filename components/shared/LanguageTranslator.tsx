"use client";
import { useEffect } from "react";

const LanguageTranslator = () => {
  useEffect(() => {
    // Set up Google Translate settings
    window.gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      languages: [
        "en",
        "fr",
        "de",
        "it",
        "es",
        "zh-TW",
        "hi",
        "ar",
        "bn",
        "pt",
        "ru",
        "ur",
        "id",
        "ja",
        "sw",
        "tr",
        "ro",
        "fa",
        "tl",
      ],
      wrapper_selector: ".gtranslate_wrapper",
      alt_flags: { en: "usa" },
    };

    // Create and append the Google Translate script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on unmount
    };
  }, []);
  return <div className="gtranslate_wrapper"></div>;
};

export default LanguageTranslator;
