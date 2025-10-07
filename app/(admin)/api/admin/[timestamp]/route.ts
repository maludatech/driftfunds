import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import Deposit from "@/models/deposit";
import Withdrawal from "@/models/withdrawal";
import { log } from "@/lib/logger";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ timestamp: string }> }
) => {
  const resolvedParams = await params;
  const timestamp = resolvedParams.timestamp;

  try {
    await connectToDb();

    const users = await User.find();
    const deposits = await Deposit.find();
    const withdrawals = await Withdrawal.find();

    return new Response(JSON.stringify({ users, deposits, withdrawals }), {
      status: 200,
    });
  } catch (error: any) {
    log.error(
      "Error while fetching data",
      error.message || "Internal Server Error"
    );
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
