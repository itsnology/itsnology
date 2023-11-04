import { connectDB } from "@utils/database";

import Category from "@models/Category";

export const revalidate = 1; //revalidate api every 1 second
export const GET = async (request) => {
   try {
      await connectDB();

      const prompts = await Category.find({});

      return new Response(JSON.stringify(prompts), { status: 200 });
   } catch (error) {
      return new Response("Failed to fetch all categories", { status: 500 });
   }
};
