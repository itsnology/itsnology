import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
   username: {
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
      minlength: 6,
      select: false,
   },
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
