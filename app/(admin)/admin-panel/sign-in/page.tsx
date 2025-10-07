import { Metadata } from "next";
import AdminSignInForm from "./admin-signin-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl = "/admin-panel/dashboard" } = searchParams;

  return <AdminSignInForm callbackUrl={callbackUrl} />;
}
