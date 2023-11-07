import { connectDB } from "@utils/database";
import SocialProduct from "@models/SocialProduct";

export const revalidate = 1; //revalidate api every 1 second
export const get = async ({ params }) => {
   try {
      await connectDB();

      const product = await SocialProduct.findById(params.id);

      if (!product) {
         return new Response("Product not found", { status: 404 });
      }

      return new Response(JSON.stringify(product), { status: 200 });
   } catch (error) {
      return new Response("Failed to fetch product", { status: 500 });
   }
};
