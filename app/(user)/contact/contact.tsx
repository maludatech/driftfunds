"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Send, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import SideNavbar from "@/components/shared/SideNavbar";
import { toast } from "sonner";
import { Spinner } from "@/components/shared/Spinner";
import Loading from "./loading";
import { log } from "@/lib/logger";
import { APP_DOMAIN, APP_DOMAIN_SHORT, APP_NAME } from "@/lib/constants";

const Support = ({ callbackUrl = "/sign-in" }: { callbackUrl?: string }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const userId = user?.userId;

  // Authentication check
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access support.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [user, router, callbackUrl, isCheckingAuth]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!userId) {
      toast.error("User ID not found. Please sign in again.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/support/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      log.error("Failed to send message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  // Show skeleton during auth check or for unauthenticated users
  if (isCheckingAuth || !user) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        <SideNavbar />
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-4 p-1 w-full">
          {/* Heading */}
          <h1 className="text-2xl first-letter:uppercase font-bold text-primary">
            Contact Support
          </h1>
          <p className="text-sm text-muted-foreground">
            Reach out to our team with any questions or feedback.
          </p>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* Form and Contact Details */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Form Section */}
            <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
              <h2 className="text-xl font-bold text-primary mb-4">
                Send Us a Message
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="w-full p-3 rounded-lg border bg-background text-foreground border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[120px]"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
                >
                  {isLoading ? (
                    <Spinner otherStyles="h-5 w-5" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
              <h2 className="text-xl font-bold text-primary mb-4">
                Contact Information
              </h2>
              <div className="flex flex-col gap-4">
                <ContactInfo
                  icon={<MapPin className="h-6 w-6 text-primary" />}
                  title="Address"
                  details={`${APP_NAME} Plc, 123 Financial Street, London, UK`}
                />
                <ContactInfo
                  icon={<Phone className="h-6 w-6 text-primary" />}
                  title="Phone"
                  details="+44 7923 456 789"
                />
                <ContactInfo
                  icon={<Send className="h-6 w-6 text-primary" />}
                  title="Email"
                  details={`info@${APP_DOMAIN_SHORT}`}
                />
                <ContactInfo
                  icon={<Globe className="h-6 w-6 text-primary" />}
                  title="Website"
                  details={APP_DOMAIN}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  details: string;
}) => (
  <div className="flex gap-4 items-center">
    {icon}
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold text-primary">{title}</h3>
      <p className="text-sm text-foreground">{details}</p>
    </div>
  </div>
);

export default Support;
