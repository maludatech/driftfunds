import { Metadata } from "next";
import ViewInvestors from "./view-investors";

export const metadata: Metadata = {
  title: "View Investors",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl = "/admin-panel/dashboard" } = searchParams;

  return <ViewInvestors callbackUrl={callbackUrl} />;
}
