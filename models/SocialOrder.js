import mongoose from "mongoose";

const SocialOrderSchema = new mongoose.Schema({
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
   selectedOption: {
      type: String,
      required: true,
   },
});

export const SocialOrder =
   mongoose.models.SocialOrder ||
   mongoose.model("SocialOrder", SocialOrderSchema);

module.exports = SocialOrder;
