import { Schema, model, models } from "mongoose";

const RatingSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
  },
  RatingStars: {
    type: Number,
    required: [true, "Please provide a Rating"],
  },
  Review: {
    type: String,
    required: [true, "Please provide a Review"],
  },
});

const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
