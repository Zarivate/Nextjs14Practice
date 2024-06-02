import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  postText: { type: String, require: true },
  // All user posts are auto deleted in 2 minutes
  // expire_at: { type: Date, default: Date.now, expires: 120 },
  // expire_at: { type: Date, default: Date.now, type: Number },
});

const Post = models?.Posts || model("Posts", PostSchema);

export default Post;
