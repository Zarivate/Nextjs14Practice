import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  postText: { type: String, require: true },
  expireAt: { type: Date, required: true },
  // All user posts are auto deleted in 2 minutes
  // createdAt: { type: Date, default: Date.now, required: true },
  // expire_at: { type: Date, default: Date.now, expires: 120 },
  // myCustomTTLField: { type: Date },
});

export const Post = models?.Posts || model("Posts", PostSchema);
