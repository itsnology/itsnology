// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   logoFile: {
      type: String,
      required: true,
   },
   bannerFile: {
      type: String,
      required: true,
   },
   isSocialMedia: {
      type: Boolean,
   },
});

export default mongoose.models.Category ||
   mongoose.model("Category", categorySchema);
