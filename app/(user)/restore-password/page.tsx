import { Metadata } from "next";
import CredentialsRestorePasswordForm from "./credentials-restore-form";

export const metadata: Metadata = {
  title: "Restore Password",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return (
    <CredentialsRestorePasswordForm
      callbackUrl={callbackUrl || " /dashboard"}
    />
  );
}
