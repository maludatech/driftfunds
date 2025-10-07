import { Metadata } from "next";
import Support from "./contact";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <Support callbackUrl={callbackUrl || "/sign-in"} />;
}
