import { Schema, model, models } from "mongoose";

const KeywordSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a Keyword"],
  },
});

const Keyword = models.Keyword || model("Keyword", KeywordSchema);

export default Keyword;
