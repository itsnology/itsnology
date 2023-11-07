import mongoose from "mongoose";

const CardOrderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
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
  cardCode: {
    type: String,
  },
  createdTime: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

export const CardOrder =
  mongoose.models.CardOrder || mongoose.model("CardOrder", CardOrderSchema);

module.exports = CardOrder;
