import { connectDB } from "@utils/database";

import User from "@models/User";

export const GET = async (request) => {
  try {
    await connectDB();

    const users = await User.find();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all categories", { status: 500 });
  }
};
