import Admin from "@/models/admin";
import { connectToDb } from "@/lib/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { log } from "@/lib/logger";

export const POST = async (req: Request) => {
  const data = await req.json();
  const { email, password } = data;

  const normalizedEmail = email.toLowerCase();

  try {
    await connectToDb();
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (!existingAdmin) {
      return new Response(JSON.stringify({ message: "Invalid admin email" }), {
        status: 401,
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid admin password" }),
        { status: 401 }
      );
    }

    const secretKey = process.env.SECRET_KEY as string;

    // Generate JWT token
    const token = jwt.sign(
      { adminId: existingAdmin._id, email: existingAdmin.email },
      secretKey,
      { expiresIn: "5d" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    log.error("Error during sign-in:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
