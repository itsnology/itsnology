import mongoose from "mongoose";

const CardOrderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
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
  cardCode: {
    type: String,
  },
});

export const CardOrder =
  mongoose.models.CardOrder || mongoose.model("CardOrder", CardOrderSchema);

module.exports = CardOrder;
