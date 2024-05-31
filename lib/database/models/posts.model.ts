import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, require: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: String, default: 1 },
  creditBalance: { type: Number, default: 10 },
});

// Turns Schema into model
const Post = models?.Posts || model("Posts", PostSchema);

export default Post;
