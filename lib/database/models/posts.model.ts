import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  postText: { type: String, require: true },
  expireAt: { type: Date, required: true },
  allowHome: { type: Boolean, required: true, default: false },
});

export const Post = models?.Posts || model("Posts", PostSchema);
