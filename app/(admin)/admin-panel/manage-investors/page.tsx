import { Metadata } from "next";
import ManageInvestors from "./manage-investors";

export const metadata: Metadata = {
  title: "Manage Investors",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl = "/admin-panel/dashboard" } = searchParams;

  return <ManageInvestors callbackUrl={callbackUrl} />;
}
