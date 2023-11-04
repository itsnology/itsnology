// pages/api/Seo/deleteKeyword.js
import { connectDB } from "@utils/database";
import Rating from "@models/Rating";
connectDB();

export async function DELETE(req, res) {
  try {
    const { id } = await req.json();
    console.log(id);

    // You should pass the keyword ID to delete
    await Rating.findByIdAndDelete(id);
    return new Response("secuss", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
