import { Metadata } from "next";
import CredentialsSignUpForm from "./credentials-signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <CredentialsSignUpForm callbackUrl={callbackUrl || "/dashboard"} />;
}
