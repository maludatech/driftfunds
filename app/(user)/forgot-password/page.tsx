import { Metadata } from "next";
import CredentialsForgotPasswordForm from "./credentials-forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return (
    <CredentialsForgotPasswordForm callbackUrl={callbackUrl || "/dashboard"} />
  );
}
