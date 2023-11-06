import mongoose from "mongoose";

const socialProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },

   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
   },
   categoryName: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   options: {
      type: [
         {
            name: {
               type: String,
               required: true,
            },
            price: {
               type: String,
               required: true,
            },
         },
      ],
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
});

export const SocialProduct =
   mongoose.models.SocialProduct ||
   mongoose.model("SocialProduct", socialProductSchema);

module.exports = SocialProduct;
