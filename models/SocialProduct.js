import mongoose from "mongoose";

const socialProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
   },
   options: {
      type: [String],
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
});

const SocialProduct = mongoose.model("SocialProduct", socialProductSchema);

module.exports = SocialProduct;
