import { connectToDb } from "@/lib/database";
import { log } from "@/lib/logger";
import User from "@/models/user";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  try {
    await connectToDb();

    // Step 1: Find the user by userId to get the referralCode
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const referralCode = user.referralCode;

    // Step 2: Find all users who have this referralCode in their referredByCode
    const referrals = await User.find({ referredByCode: referralCode });

    // Step 3: Return the total number of referrals
    return new Response(JSON.stringify({ totalReferral: referrals.length }), {
      status: 200,
    });
  } catch (error) {
    log.error("Error fetching referral details", error);
    return new Response(
      JSON.stringify({ message: "Error fetching referral details" }),
      { status: 500 }
    );
  }
};
