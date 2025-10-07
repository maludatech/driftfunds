import { connectToDb } from "@/lib/database";
import { log } from "@/lib/logger";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const PATCH = async (req: Request) => {
  try {
    // Extract data from request body
    const formData = await req.json();
    const { email, oldPassword, newPassword } = formData;

    // Connect to the database
    await connectToDb();

    // Retrieve the admin's document from the database
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found" }), {
        status: 404,
      });
    }

    // Compare the provided old password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isPasswordMatch) {
      return new Response(
        JSON.stringify({ message: "Incorrect old password" }),
        { status: 401 }
      );
    }

    // Hash and salt the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    const updatedAdmin = await Admin.findOneAndUpdate(
      { email: email },
      { password: hashedNewPassword },
      { new: true }
    );

    const secretKey = process.env.SECRET_KEY as string;
    // Generate a new JWT token with updated user information
    const token = jwt.sign(
      {
        AdminId: updatedAdmin._id,
        email: updatedAdmin.email,
      },
      secretKey,
      { expiresIn: "3d" }
    );

    // Respond with success message and token
    return new Response(
      JSON.stringify({
        message: "Admin profile updated successfully!!",
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    log.error("Error during Admin profile update", error);
    return new Response(
      JSON.stringify({ message: "Error Updating Admin Profile" }),
      { status: 500 }
    );
  }
};
