import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import PasswordForgotEmail from "@/emails/ForgotPasswordEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { email } = data;

    await connectToDb();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({
          message:
            "If this email is registered, a password reset link will be sent.",
        }),
        {
          status: 404,
        }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(3).toString("hex").slice(0, 6);
    const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

    // Save token and expiry to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

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

    // Render the email component to HTML
    const emailHtml = await render(
      <PasswordForgotEmail username={user.username} resetToken={resetToken} />
    );

    const mailOptions = {
      from: `${APP_NAME} Plc <${APP_EMAIL}>`,
      to: user.email,
      subject: "Password Reset - CryptFX",
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message:
          "If this email is registered, a password reset link will be sent.",
      }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error sending email", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
