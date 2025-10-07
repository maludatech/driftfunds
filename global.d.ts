// global.d.ts
export {};

declare global {
  interface Window {
    gtranslateSettings: {
      default_language: string;
      detect_browser_language: boolean;
      languages: string[];
      wrapper_selector: string;
      alt_flags: Record<string, string>;
    };
  }
}
