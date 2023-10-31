import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
   name: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Username already exists"],
   },
   email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
   },

   password: {
      type: String,
      required: [true, "Please provide a password"],
   },
});

const User = models.User || model("User", UserSchema);

export default User;
