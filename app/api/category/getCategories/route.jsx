// pages/api/fetchCategories.js
import { connectDB } from "@utils/database";
import Category from "@models/Category";

export async function GET(req, res) {
   try {
      await connectDB(); // Ensure you're connected to the database

      // Use Mongoose to fetch data from the Category collection
      const categories = await Category.find();

      return new Response({ categories }, 200);
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
