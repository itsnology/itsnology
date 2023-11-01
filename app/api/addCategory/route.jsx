// pages/api/categories.js

import { connectDB } from "@utils/database";
import Category from "@models/Category";

export default async (req, res) => {
  if (req.method === "POST") {
    // Create a new category
    try {
      await connectDB();
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "PUT") {
    // Update a category
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.query.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return Response.status(404).json({ error: "Category not found" });
      }
      Response.json(updatedCategory);
    } catch (error) {
      console.error(error);
      Response.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "DELETE") {
    // Delete a category
    try {
      const deletedCategory = await Category.findByIdAndRemove(req.query.id);
      if (!deletedCategory) {
        return Response.status(404).json({ error: "Category not found" });
      }
      res.json(deletedCategory);
    } catch (error) {
      console.error(error);
      Response.status(500).json({ error: "Server error" });
    }
  }
};
