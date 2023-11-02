// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  logoFile: String,
  bannerFile: String,
  isSocialMedia: Boolean,
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
