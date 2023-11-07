import { connectDB } from "@utils/database";
import CardProduct from "@models/CardProduct";

export const revalidate = 1; //revalidate api every 1 second
export const GET = async (request, { params }) => {
   try {
      await connectDB();

      const prompts = await CardProduct.find({});

      return new Response(JSON.stringify(prompts), { status: 200 });
   } catch (error) {
      return new Response("Failed to fetch all categories", { status: 500 });
   }
};
