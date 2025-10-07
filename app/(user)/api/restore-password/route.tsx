import { connectToDb } from "@/lib/database";
import { log } from "@/lib/logger";
import User from "@/models/user";

export const POST = async (req: Request) => {
  const { code } = await req.json();

  try {
    await connectToDb();
    const user = await User.findOne({ resetToken: code });

    if (!user) {
      return new Response(JSON.stringify({ message: "Code incorrect" }), {
        status: 404,
      });
    }

    // Check if the reset token has expired
    if (user.resetTokenExpiry < Date.now()) {
      return new Response(
        JSON.stringify({ message: "Reset code has expired" }),
        {
          status: 400,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Code correct", userId: user._id }),
      { status: 200 }
    );
  } catch (error) {
    log.error("Error resolving code: ", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
