import { connectToDb } from "@/lib/database";
import { log } from "@/lib/logger";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { email, password } = data;

  try {
    await connectToDb();

    // Find the user by email to get the current password
    const user = await User.findOne({ email: email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Compare the new password with the existing password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return new Response(
        JSON.stringify({
          message: "Old password cannot be used. Please choose a new password.",
        }),
        { status: 400 }
      );
    }

    // Hash and salt the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's document in the database with the new password
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }, // Update with the hashed password
      { new: true } // Return the updated user document
    );

    const secretKey = process.env.SECRET_KEY as string;

    // Generate a new JWT token with updated user information
    const token = jwt.sign(
      {
        userId: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        nationality: updatedUser.nationality,
      },
      secretKey,
      { expiresIn: "3d" }
    );

    return new Response(
      JSON.stringify({ message: "Profile updated successfully!", token }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error during profile update", error);
    return new Response(JSON.stringify({ message: "Error Updating Profile" }), {
      status: 500,
    });
  }
};
