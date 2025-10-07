import { Metadata } from "next";
import EditInvestors from "./edit-invetsors";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Investor",
};

export default async function Page({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ id?: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const params = await paramsPromise; // Await params

  // Validate params.plan
  if (!params.id) {
    redirect("/admin-panel/manage-investors"); // Redirect if id is missing
  }

  return <EditInvestors params={{ id: params.id }} callbackUrl={callbackUrl} />;
}
