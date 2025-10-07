import { Metadata } from "next";
import Deposit from "./deposit";

export const metadata: Metadata = {
  title: "Deposit",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <Deposit callbackUrl={callbackUrl || "/sign-in"} />;
}
