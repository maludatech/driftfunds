import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import Withdrawal from "@/models/withdrawal";
import Deposit from "@/models/deposit";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { render } from "@react-email/render";
import WelcomeEmail from "@/emails/WelcomeEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

// Function to generate a unique referral code
async function generateUniqueReferralCode(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let attempts = 0; attempts < 10; attempts++) {
    code = "";
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const existingUser = await User.findOne({ referralCode: code });
    if (!existingUser) {
      return code;
    }
  }

  throw new Error(
    "Failed to generate a unique referral code after 10 attempts"
  );
}

const generateUniqueResetToken = async () => {
  const generateToken = () => crypto.randomBytes(3).toString("hex").slice(0, 6);

  let resetToken;
  let existingUser;

  do {
    resetToken = generateToken();
    existingUser = await User.findOne({ resetToken });
  } while (existingUser);

  return resetToken;
};

export const POST = async (req: Request) => {
  try {
    const processedData = await req.json();

    if (!processedData || !processedData.email) {
      return new Response(JSON.stringify({ message: "Invalid request data" }), {
        status: 400,
      });
    }

    const { username, email, password, fullName, nationality, referralCode } =
      processedData;

    // Convert email, username, and fullName to lowercase
    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username.toLowerCase();
    const normalizedFullName = fullName.toLowerCase();

    await connectToDb();

    // Check if the email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({
          message: "User with this email already exists, please sign in",
        }),
        { status: 400 }
      );
    }

    // Check if the username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({
          message: "Username already exists, please choose a different one",
        }),
        { status: 400 }
      );
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate user's own referral code
      const userReferralCode = await generateUniqueReferralCode(6);

      // Generate unique reset token
      const resetToken = await generateUniqueResetToken();
      const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

      // Create new user
      const newUser = new User({
        email: normalizedEmail,
        username: normalizedUsername,
        password: hashedPassword,
        fullName: normalizedFullName,
        nationality,
        referralCode: userReferralCode,
        referredByCode: referralCode,
        resetToken,
        resetTokenExpiry,
      });
      await newUser.save();

      // Create new deposit for the user
      const newDeposit = new Deposit({
        investor: newUser._id,
      });
      await newDeposit.save();

      // Create new withdrawal for the user
      const newWithdrawal = new Withdrawal({
        investor: newUser._id,
      });
      await newWithdrawal.save();

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

      // Render the react-email component to HTML
      const emailHtml = await render(
        <WelcomeEmail username={newUser.username} />
      );

      const mailOptions = {
        from: `${APP_NAME} Plc <${APP_EMAIL}>`,
        to: newUser.email,
        subject: "Welcome to CryptFX",
        html: emailHtml,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Return success response
      return new Response(
        JSON.stringify({
          message: "User created successfully",
        }),
        { status: 201 }
      );
    } catch (error: any) {
      log.error("Error creating user or sending email:", error.message);
      return new Response(
        JSON.stringify({ message: "Failed to create user or send email" }),
        { status: 500 }
      );
    }
  } catch (error: any) {
    log.error("Error during signup:", error.message || "Internal Server Error");
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
