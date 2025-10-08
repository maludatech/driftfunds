"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { APP_DOMAIN_SHORT, APP_NAME } from "@/lib/constants";

const Contact = ({ id }: { id: string }) => {
  return (
    <section
      id={id}
      className="flex items-center justify-center bg-background py-16 text-foreground"
      aria-label="Contact Section"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-lg bg-card/80 p-6 sm:p-8 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-lg sm:text-xl uppercase font-semibold text-muted-foreground">
              Contact
            </h1>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
              Get in Touch with {APP_NAME}
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center lg:flex-row gap-6">
            <div className="w-full  flex flex-col gap-6">
              <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Our Address
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {APP_NAME} Plc, 456 Blockchain Avenue, New York, USA
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col items-center gap-3">
                    <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Email Us
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      info@{APP_DOMAIN_SHORT}
                    </p>
                  </div>
                </div>
                <div className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col items-center gap-3">
                    <Phone
                      className="h-8 w-8 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Call Us
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      +1 212 555 0198
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
