// pages/api/Seo/deleteKeyword.js
import { connectDB } from "@utils/database";
import CardProduct from "@models/CardProduct";
connectDB();

export async function DELETE(req, res) {
  try {
    const { id } = await req.json();
    console.log(id);

    // You should pass the keyword ID to delete
    await CardProduct.findByIdAndDelete(id);
    return new Response("secuss", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
