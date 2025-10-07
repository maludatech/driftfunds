import { Metadata } from "next";
import SendEmailForm from "./send-email-form";

export const metadata: Metadata = {
  title: "Compose Email",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <SendEmailForm callbackUrl={callbackUrl || "/admin-panel/sign-in"} />;
}
