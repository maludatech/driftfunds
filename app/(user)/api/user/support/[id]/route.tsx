import nodemailer from "nodemailer";
import User from "@/models/user";
import { connectToDb } from "@/lib/database";
import AdminSupportEmail from "@/emails/AdminSupportEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL } from "@/lib/constants";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;
  const { name, email, subject, message } = await req.json();

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

    // Render admin email
    const adminEmailHtml = await renderEmailToString(AdminSupportEmail, {
      username: user.username,
      fullName: name || user.fullName || "Unknown",
      email: email || user.email,
      subject,
      message,
    });

    // Email to the admin
    const adminMailOptions = {
      from: email || user.email,
      to: APP_EMAIL,
      subject,
      html: adminEmailHtml,
    };

    // Send email
    await transporter.sendMail(adminMailOptions);

    // Return success message
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email!" }), {
      status: 400,
    });
  }
};
