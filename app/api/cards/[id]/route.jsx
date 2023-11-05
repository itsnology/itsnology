import { connectDB } from "@utils/database";
import CardProduct from "@models/CardProduct";
import Category from "@models/Category";

export const revalidate = 1; //revalidate api every 1 second
export const GET = async (request, { params }) => {
   try {
      await connectDB();

      const prompts = await CardProduct.find({ category: params.id });

      return new Response(JSON.stringify(prompts), { status: 200 });
   } catch (error) {
      return new Response("Failed to fetch all categories", { status: 500 });
   }
};
