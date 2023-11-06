// pages/api/fetchCategories.js
import { connectDB } from "@utils/database";
import Rating from "@models/Rating";
connectDB();

export async function GET(req, res) {
  try {
    const Ratings = await Rating.find();

    return new Response(JSON.stringify(Ratings), { status: 200 });
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
