import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import Deposit from "@/models/deposit";
import Withdrawal from "@/models/withdrawal";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { log } from "@/lib/logger";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDb();

    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    log.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching user details" }),
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const data = await req.json();
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    const { updatedPassword } = data;

    // Check if the updatedPassword is provided
    if (!updatedPassword) {
      return new Response(
        JSON.stringify({ message: "Updated password is required" }),
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(updatedPassword, 10);

    // Connect to the database
    await connectToDb();

    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    // Check if the user was found and updated
    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Return success message with the updated user
    return new Response(
      JSON.stringify({
        message: "User password updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error updating user password:", error);
    return new Response(
      JSON.stringify({ message: "Error updating user password" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    await connectToDb();

    // Delete the user
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      revalidatePath("/admin-panel/manage-investors"); // Revalidate even on 404 to ensure UI updates
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Delete all deposits associated with the user
    await Deposit.deleteMany({ investor: userId });

    // Delete all withdrawals associated with the user
    await Withdrawal.deleteMany({ investor: userId });

    // Revalidate relevant paths
    revalidatePath("/admin-panel/manage-investors");
    revalidatePath("/admin-panel/dashboard");

    return new Response(
      JSON.stringify({
        message: "User, deposits, and withdrawals deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error deleting user and related data:", error);
    revalidatePath("/admin-panel/manage-investors"); // Revalidate on error to ensure UI updates
    return new Response(
      JSON.stringify({ message: "Error deleting user and related data" }),
      { status: 500 }
    );
  }
};
