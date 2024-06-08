import { connectToDatabase } from "@/lib/database/mongoose";
import { Post } from "@/lib/database/models/posts.model";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/lib/actions/user.actions";

export async function POST(req: any) {
  // Grab the clerk userId using the built in auth method
  const { userId } = getAuth(req);

  // Grab the user details
  const { email, username, postText, liveTime, allowHome } = await req.json();
  // Create the deletion date by adding the passed in "liveTime" in milliseconds to the current date
  const expireAt = new Date(new Date().getTime() + liveTime * 1000);
  try {
    await connectToDatabase();

    const newPost = new Post({
      userId,
      email,
      username,
      postText,
      expireAt,
      allowHome,
    });

    // Make it so the documents in the database are expired right at the moment they reach their expireAt Date, due to the mongodb deletion reaper running
    // every 60 seconds however, documents may persist for up to a minute past their actual deletion date.
    Post.schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the post", { status: 500 });
  }
}

export async function GET(req: any) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Filter out just the prompts alongside their creators
    const posts = await Post.find({}).populate("userId");

    // Return the data
    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
}
