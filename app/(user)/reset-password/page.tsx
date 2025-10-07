import { Metadata } from "next";
import CredentialsResetPasswordForm from "./credential-reset-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return (
    <CredentialsResetPasswordForm callbackUrl={callbackUrl || "/dashboard"} />
  );
}
