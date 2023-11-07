import mongoose from "mongoose";
import User from "@models/User"; // Import the User model
import CardOrder from "@models/CardOrder"; // Import the CardOrder model

export async function GET(request) {
  try {
    const { userId, orderId } = request.query;
    console.log(orderId);

    // Check if the provided userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json({ message: "Invalid user ID" }, 400);
    }

    // Check if the provided orderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return Response.json({ message: "Invalid order ID" }, 400);
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User not found" }, 404);
    }

    // Find the order by ID within the user's orders
    const order = user.orders.find((order) => order.equals(orderId));

    if (!order) {
      return Response.json({ message: "Order not found for this user" }, 404);
    }

    // Fetch additional details for the order from the CardOrder model
    const orderDetails = await CardOrder.findById(order);

    if (!orderDetails) {
      return Response.json({ message: "Order details not found" }, 404);
    }

    return Response.json(JSON.stringify(orderDetails));
  } catch (error) {
    console.error("Error fetching order details:", error);
    return Response.json({ message: "Error fetching order details" }, 500);
  }
}
