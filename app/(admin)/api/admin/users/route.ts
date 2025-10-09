import { connectToDb } from "@/lib/database";
import User from "@/models/user";
import { log } from "@/lib/logger";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find({}, "email username").lean();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    log.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Error fetching users" }), {
      status: 500,
    });
  }
};
