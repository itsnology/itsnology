import { connectDB } from "@utils/database";
import SocialProduct from "@models/SocialProduct";
import Category from "@models/Category";

export const revalidate = 1; //revalidate api every 1 second
export const GET = async (request, { params }) => {
   try {
      await connectDB();

      const prompts = await SocialProduct.findById(params.id);

      return new Response(JSON.stringify(prompts), { status: 200 });
   } catch (error) {
      return new Response("Failed to fetch all categories", { status: 500 });
   }
};
