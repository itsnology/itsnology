import { connectDB } from "@utils/database";
import CardOrder from "@models/CardOrder";

export const GET = async (request) => {
  try {
    await connectDB();

    // Extract the userId from the request parameters
    const userId = request.params.userId;

    // Fetch orders for the specified user
    const orders = await CardOrder.find({ username: userId });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch orders", { status: 500 });
  }
};
