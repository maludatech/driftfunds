"use server";

import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { PasswordResetEmail } from "@/emails/ResetPasswordEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

export const POST = async (req: Request) => {
  const data = await req.json();
  const { userId, newPassword } = data;

  try {
    await connectToDb();

    // Fetch the user's current password hash from the database
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Compare the new password with the current password
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return new Response(
        JSON.stringify({ message: "Old password cannot be used" }),
        { status: 400 }
      );
    }

    // Hash the new password and update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { _id: userId },
      { password: hashedPassword, resetToken: null }
    );

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Render the email
    const emailHtml = await render(
      <PasswordResetEmail
        username={user.username}
        updatedDate={new Date()}
        userId={user._id}
      />
    );

    const mailOptions = {
      from: `${APP_NAME} Plc <${APP_EMAIL}>`,
      to: user.email,
      subject: "Password Change Notification",
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error updating password: ", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
