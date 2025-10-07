import { Metadata } from "next";
import AdminDashboard from "./admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function Page(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  return <AdminDashboard callbackUrl={callbackUrl || "/admin-panel/sign-in"} />;
}
