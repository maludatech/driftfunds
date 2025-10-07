import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { log } from "@/lib/logger";

export const POST = async (req: Request) => {
  const normalizedData = await req.json();
  const { email, password } = normalizedData;

  try {
    await connectToDb();
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "Invalid email" }), {
        status: 401,
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }
    // Include the createdAt field in the response
    const registrationDate = existingUser.createdAt;

    const secretKey = process.env.SECRET_KEY as string;

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        fullName: existingUser.fullName,
        nationality: existingUser.nationality,
        referralCode: existingUser.referralCode,
      },
      secretKey,
      { expiresIn: "3d" }
    );

    return new Response(JSON.stringify({ token, registrationDate }), {
      status: 200,
    });
  } catch (error: any) {
    log.error("Error during sign-in:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
