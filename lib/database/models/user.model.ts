import { Schema, models, model, Document } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: String, default: 1 },
});

// Turns Schema into model
const User = models?.Users || model("Users", UserSchema);

export default User;
