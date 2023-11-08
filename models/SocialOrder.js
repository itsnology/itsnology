import mongoose from "mongoose";

const CardOrderSchema = new mongoose.Schema({
   productName: {
      type: String,
      required: true,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   price: {
      type: Number,
      required: true,
   },
   linkpost: {
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
