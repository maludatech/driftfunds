import { Metadata } from "next";
import Withdrawal from "./withdrawal";

export const metadata: Metadata = {
  title: "Withdrawal",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <Withdrawal callbackUrl={callbackUrl || "/sign-in"} />;
}
