import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import Deposit from "@/models/deposit";
import nodemailer from "nodemailer";
import { UserDepositEmail } from "@/emails/UserDepositEmail";
import { AdminDepositEmail } from "@/emails/AdminDepositEmail";
import UserDepositApprovalEmail from "@/emails/UserDepositApprovalEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

interface User {
  id: string;
}

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  try {
    await connectToDb();

    const deposits = await Deposit.findOne({ investor: userId });

    if (!deposits) {
      log.error("User deposit details not found");
      return new Response(JSON.stringify({ message: "Deposits not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(deposits), { status: 200 });
  } catch (error: any) {
    log.error("Error fetching user deposit details", error);
    return new Response(
      JSON.stringify({ message: "Error fetching user deposit details" }),
      { status: 500 }
    );
  }
};

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const {
    pendingDeposit,
    selectedCoin,
    selectedPlan,
    dailyReturn,
    startDate,
    endDate,
  } = await req.json();

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

    const updatedDeposit = await Deposit.findOneAndUpdate(
      { investor: userId },
      {
        pendingDeposit: pendingDeposit,
        plan: selectedPlan,
        dailyReturn: dailyReturn,
        startDate: startDate,
        endDate: endDate,
      },
      { new: true }
    );

    if (!updatedDeposit) {
      return new Response(
        JSON.stringify({ message: "Deposit details not found" }),
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
    const userEmailHtml = await renderEmailToString(UserDepositEmail, {
      username: user.username,
      pendingDeposit,
      selectedCoin,
      selectedPlan,
    });

    // Email to the user
    const userDepositMailOptions = {
      from: `${APP_NAME} Plc`,
      to: user.email,
      subject: "Deposit Confirmation",
      html: userEmailHtml,
    };

    // Render admin email
    const adminEmailHtml = await renderEmailToString(AdminDepositEmail, {
      username: user.username,
      email: user.email,
      pendingDeposit,
      selectedCoin,
      selectedPlan,
    });

    // Email to the admin
    const adminDepositMailOptions = {
      from: `${APP_NAME} Plc`,
      to: APP_EMAIL,
      subject: "New Deposit Notification",
      html: adminEmailHtml,
    };

    // Send emails
    await transporter.sendMail(userDepositMailOptions);
    await transporter.sendMail(adminDepositMailOptions);

    // Return success message with the updated user
    return new Response(
      JSON.stringify({
        message: "Deposit updated successfully!!",
        updatedDeposit: updatedDeposit,
      }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error updating user deposit details", error);
    return new Response(
      JSON.stringify({ message: "Error updating deposit details!" }),
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
  const { activeDeposit, lastDeposit, balance, pendingDeposit } =
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

    const updatedDeposit = await Deposit.findOneAndUpdate(
      { investor: userId },
      { pendingDeposit, activeDeposit, lastDeposit, balance, isActive: true },
      { new: true }
    );

    if (!updatedDeposit) {
      return new Response(
        JSON.stringify({ message: "Deposit details not found" }),
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
    const userEmailHtml = await renderEmailToString(UserDepositApprovalEmail, {
      username: user.username,
      lastDeposit,
    });

    // Email to the user for deposit approval
    const userDepositMailOptions = {
      from: `${APP_NAME} Plc <${APP_EMAIL}>`,
      to: user.email,
      subject: "Deposit Approval",
      html: userEmailHtml,
    };

    // Send email
    await transporter.sendMail(userDepositMailOptions);

    // Return success message with the updated deposit
    return new Response(
      JSON.stringify({
        message: "Deposit updated successfully!!",
        updatedDeposit,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    log.error("Error updating user deposit details:", error);
    return new Response(
      JSON.stringify({ message: "Error updating user deposit details!" }),
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  try {
    await connectToDb();

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Reset deposit details to default values
    const updatedDeposit = await Deposit.findOneAndUpdate(
      { investor: userId },
      {
        activeDeposit: 0,
        isActive: false,
        lastDeposit: 0,
        balance: 0,
        dailyReturn: 0,
        totalReturn: 0,
        pendingDeposit: 0,
        plan: "none",
        startDate: null,
        endDate: null,
      },
      { new: true }
    );

    if (!updatedDeposit) {
      return new Response(
        JSON.stringify({ message: "Deposit details not found" }),
        { status: 404 }
      );
    }

    // Return success message with the updated deposit
    return new Response(
      JSON.stringify({
        message: "Deposit reset successfully!",
        updatedDeposit,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    log.error("Error resetting user deposit details", error);
    return new Response(
      JSON.stringify({ message: "Error resetting user deposit details!" }),
      { status: 500 }
    );
  }
};
