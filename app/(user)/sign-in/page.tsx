import { Metadata } from "next";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl = "/dashboard" } = searchParams;

  return <CredentialsSignInForm callbackUrl={callbackUrl} />;
}
