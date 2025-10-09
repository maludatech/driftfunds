import nodemailer from "nodemailer";
import { marked } from "marked";
import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import UserBroadcastEmail from "@/emails/UserBroadcastEmail";
import { log } from "@/lib/logger";
import { APP_EMAIL, APP_NAME } from "@/lib/constants";

export const POST = async (req: Request) => {
  const data = await req.json();
  const { subject, heading, message, recipientEmail } = data;

  const renderEmailToString = async (
    EmailComponent: React.FC<any>,
    props: any
  ) => {
    const { render } = await import("@react-email/render");
    return render(<EmailComponent {...props} />);
  };

  try {
    await connectToDb();

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

    if (recipientEmail && recipientEmail !== "all") {
      // Send to individual user
      const user = await User.findOne(
        { email: recipientEmail },
        "email username"
      );
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      const emailHtml = await renderEmailToString(UserBroadcastEmail, {
        username: user.username,
        subject,
        heading,
        message: htmlMessage,
      });

      const MailOptions = {
        from: `${APP_NAME} Plc <${APP_EMAIL}>`,
        to: user.email,
        subject,
        html: emailHtml,
      };

      await transporter.sendMail(MailOptions);

      return new Response(
        JSON.stringify({
          message: `Email sent successfully to ${user.email}!`,
        }),
        { status: 200 }
      );
    } else {
      // Broadcast to all users
      const users = await User.find({}, "email username");

      for (const user of users) {
        const emailHtml = await renderEmailToString(UserBroadcastEmail, {
          username: user.username,
          subject,
          heading,
          message: htmlMessage,
        });

        const MailOptions = {
          from: `${APP_NAME} Plc <${APP_EMAIL}>`,
          to: user.email,
          subject,
          html: emailHtml,
        };

        await transporter.sendMail(MailOptions);
      }

      return new Response(
        JSON.stringify({ message: "Emails sent successfully to all users!" }),
        { status: 200 }
      );
    }
  } catch (error: any) {
    log.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending emails!" }), {
      status: 500,
    });
  }
};
