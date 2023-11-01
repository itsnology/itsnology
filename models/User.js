import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
   name: {
      type: String,
      required: [true, "Please provide a username"],
   },
   email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
   },

   number: {
      type: Number,
      required: [true, "Please provide a number"],
      unique: [true, "Number already exists"],
   },
});

const User = models.User || model("User", UserSchema);

export default User;
