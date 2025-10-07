import nodemailer from "nodemailer";
import { marked } from "marked";
import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import UserBroadcastEmail from "@/emails/UserBroadcastEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

export const POST = async (req: Request) => {
  const data = await req.json();
  const { subject, heading, message } = data;

  const renderEmailToString = async (
    EmailComponent: React.FC<any>,
    props: any
  ) => {
    const { render } = await import("@react-email/render");
    return render(<EmailComponent {...props} />);
  };

  try {
    await connectToDb();

    const users = await User.find({}, "email username");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const htmlMessage = marked(message || "");

    for (const user of users) {
      const emailHtml = await renderEmailToString(UserBroadcastEmail, {
        username: user.username,
        subject,
        heading,
        message: htmlMessage, // ✅ inject parsed HTML
      });

      const MailOptions = {
        from: `${APP_NAME} Plc <${APP_EMAIL}>`,
        to: user.email,
        subject,
        html: emailHtml,
      };

      // Send the email
      await transporter.sendMail(MailOptions);
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      { status: 200 }
    );
  } catch (error: any) {
    log.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending emails!" }), {
      status: 500,
    });
  }
};
