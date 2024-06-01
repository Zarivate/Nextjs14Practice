import { connectToDatabase } from "@/lib/database/mongoose";
import Post from "@/lib/database/models/posts.model";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/lib/actions/user.actions";

export async function POST(req: any) {
  // Grab the clerk userId using the built in auth method
  const { userId } = getAuth(req);

  // Grab the user details
  const { email, username, postText } = await req.json();

  try {
    await connectToDatabase();

    const newPost = new Post({ userId, email, username, postText });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the post", { status: 500 });
  }
}
