import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import Withdrawal from "@/models/withdrawal";
import nodemailer from "nodemailer";
import UserWithdrawalEmail from "@/emails/UserWithdrawalEmail";
import AdminWithdrawalEmail from "@/emails/AdminWithdrawalEmail";
import UserWithdrawalApprovalEmail from "@/emails/UserWithdrawalApprovalEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  try {
    await connectToDb();

    const withdrawal = await Withdrawal.findOne({ investor: userId });

    if (!withdrawal) {
      log.error("User withdrawal details not found");
      return new Response(
        JSON.stringify({ message: "Withdrawals not found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(withdrawal), { status: 200 });
  } catch (error: any) {
    log.error("Error fetching user withdrawal details", error);
    return new Response(
      JSON.stringify({ message: "Error fetching user withdrawal details" }),
      { status: 404 }
    );
  }
};

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const { pendingWithdrawal, selectedCoin, walletAddress } = await req.json();

  const renderEmailToString = async (
    EmailComponent: React.FC<any>,
    props: any
  ) => {
    const { render } = await import("@react-email/render");
    return render(<EmailComponent {...props} />);
  };

  try {
    await connectToDb();

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const updatedWithdrawal = await Withdrawal.findOneAndUpdate(
      { investor: userId },
      { pendingWithdrawal: pendingWithdrawal },
      { new: true }
    );

    if (!updatedWithdrawal) {
      return new Response(
        JSON.stringify({ message: "Withdrawal details not found" }),
        { status: 404 }
      );
    }

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

    // Render user email
    const userEmailHtml = await renderEmailToString(UserWithdrawalEmail, {
      username: user.username,
      pendingWithdrawal,
      selectedCoin,
      walletAddress,
    });

    // Email to the user
    const userWithdrawalMailOptions = {
      from: `${APP_NAME} Plc`,
      to: user.email,
      subject: "Withdrawal Confirmation",
      html: userEmailHtml,
    };

    // Render admin email
    const adminEmailHtml = await renderEmailToString(AdminWithdrawalEmail, {
      username: user.username,
      email: user.email,
      pendingWithdrawal,
      selectedCoin,
      walletAddress,
    });

    // Email to the admin
    const adminWithdrawalMailOptions = {
      from: `${APP_NAME} Plc`,
      to: APP_EMAIL,
      subject: "New Withdrawal Notification",
      html: adminEmailHtml,
    };

    // Send emails
    await transporter.sendMail(userWithdrawalMailOptions);
    await transporter.sendMail(adminWithdrawalMailOptions);

    // Return success message with the updated withdrawal details
    return new Response(
      JSON.stringify({
        message: "Withdrawal updated successfully!!",
        updatedWithdrawal: updatedWithdrawal,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    log.error("Error updating user withdrawal details:", error);
    return new Response(
      JSON.stringify({ message: "Error updating withdrawal details!" }),
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const { withdrawalAmount, pendingWithdrawal, lastWithdrawal } =
    await req.json();

  const renderEmailToString = async (
    EmailComponent: React.FC<any>,
    props: any
  ) => {
    const { render } = await import("@react-email/render");
    return render(<EmailComponent {...props} />);
  };

  try {
    await connectToDb();
    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const updatedWithdrawal = await Withdrawal.findOneAndUpdate(
      { investor: userId },
      {
        pendingWithdrawal: pendingWithdrawal,
        withdrawalAmount: withdrawalAmount,
        lastWithdrawal: lastWithdrawal,
      },
      { new: true }
    );

    if (!updatedWithdrawal) {
      return new Response(
        JSON.stringify({ message: "Withdrawal details not found" }),
        { status: 404 }
      );
    }

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

    // Render user email
    const userEmailHtml = await renderEmailToString(
      UserWithdrawalApprovalEmail,
      {
        username: user.username,
        lastWithdrawal,
      }
    );

    // Email to the user
    const userWithdrawalMailOptions = {
      from: `${APP_NAME} Plc <${APP_EMAIL}>`,
      to: user.email,
      subject: "Withdrawal Approval",
      html: userEmailHtml,
    };

    // Send email
    await transporter.sendMail(userWithdrawalMailOptions);

    // Return success message with the updated withdrawal
    return new Response(
      JSON.stringify({
        message: "Withdrawal updated successfully!!",
        updatedWithdrawal,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    log.error("Error updating user withdrawal details:", error);
    return new Response(
      JSON.stringify({ message: "Error updating user withdrawal details!" }),
      { status: 500 }
    );
  }
};
