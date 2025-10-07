import { Metadata } from "next";
import ChangePasswordForm from "./change-password-form";

export const metadata: Metadata = {
  title: "Security",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <ChangePasswordForm callbackUrl={callbackUrl || "/admin-panel/sign-in"} />;
}
