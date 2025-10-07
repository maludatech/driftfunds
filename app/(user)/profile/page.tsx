import { Metadata } from "next";
import Profile from "./profile";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <Profile callbackUrl={callbackUrl || "/sign-in"} />;
}
