// pages/api/fetchCategories.js
import { connectDB } from "@utils/database";
import CardOrder from "@models/CardOrder";
connectDB();

export async function GET(req, res) {
  try {
    const Orders = await CardOrder.find();

    return new Response(JSON.stringify(Orders), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      {
        error: "An error occurred while fetching categories",
      },
      500
    );
  }
}
