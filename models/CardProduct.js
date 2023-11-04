import mongoose from "mongoose";

const cardProductSchema = new mongoose.Schema({
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
   },
   categoryName: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   cardCodes: {
      type: [String],
   },
   image: {
      type: String,
      required: true,
   },
});

const CardProduct = mongoose.model("CardProduct", cardProductSchema);

module.exports = CardProduct;
