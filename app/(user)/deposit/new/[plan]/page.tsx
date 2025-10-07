import { Metadata } from "next";
import NewDeposit from "./new-deposit";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New deposit",
};

export default async function Page({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ plan?: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const params = await paramsPromise; // Await params

  // Validate params.plan
  if (!params.plan) {
    redirect("/deposit"); // Redirect if plan is missing
  }

  return (
    <NewDeposit params={{ plan: params.plan }} callbackUrl={callbackUrl} />
  );
}
