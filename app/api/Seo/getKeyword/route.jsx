// pages/api/fetchCategories.js
import { connectDB } from "@utils/database";
import Keyword from "@models/Keyword";
connectDB();

export async function GET(req, res) {
  try {
    const Keywords = await Keyword.find();

    return new Response(JSON.stringify(Keywords), { status: 200 });
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
