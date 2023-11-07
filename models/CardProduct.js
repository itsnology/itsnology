import mongoose from "mongoose";

const cardProductSchema = new mongoose.Schema({
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

  price: {
    type: Number,
    required: true,
  },
  cardCodes: {
    type: [String],
  },
  createdTime: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  image: {
    type: String,
    required: true,
  },
});

export const CardProduct =
  mongoose.models.CardProduct ||
  mongoose.model("CardProduct", cardProductSchema);

module.exports = CardProduct;
