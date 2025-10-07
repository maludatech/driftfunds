import { connectToDb } from "@/lib/database";
import { log } from "@/lib/logger";
import Deposit from "@/models/deposit";

export const POST = async () => {
  try {
    await connectToDb();

    const today = new Date();

    // Find all active deposits (endDate > today and isActive is true)
    const activeDeposits = await Deposit.find({
      $or: [
        { endDate: { $gt: today }, isActive: true }, // Active deposits
        { endDate: { $lte: today }, isActive: true }, // Completed but not updated
      ],
    });

    if (!activeDeposits.length) {
      return new Response(
        JSON.stringify({ message: "No deposits to update." }),
        { status: 200 }
      );
    }

    const updatePromises = activeDeposits.map(async (deposit) => {
      if (new Date(deposit.endDate).getTime() <= today.getTime()) {
        // Plan has completed
        const updatedBalance = deposit.balance + (deposit.totalReturn || 0);

        await Deposit.findByIdAndUpdate(deposit._id, {
          balance: updatedBalance,
          activeDeposit: 0,
          isActive: false,
          startDate: null,
          endDate: null,
          plan: "none",
          totalReturn: 0,
        });
        return deposit.investor;
      } else {
        // Plan is still active, update the daily profit
        const dailyReturn = deposit.dailyReturn;
        const updatedReturn = (deposit.totalReturn || 0) + dailyReturn;

        await Deposit.findByIdAndUpdate(deposit._id, {
          totalReturn: updatedReturn,
        });
        return deposit.investor;
      }
    });

    await Promise.all(updatePromises);
    return new Response(
      JSON.stringify({ message: "Deposits processed successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error updating deposits:", error);
    return new Response(
      JSON.stringify({ message: "Error updating deposits!" }),
      { status: 500 }
    );
  }
};
