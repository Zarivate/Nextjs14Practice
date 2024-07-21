import { connectToDatabase } from "@/lib/database/mongoose";
import { Post } from "@/lib/database/models/posts.model";
import { getAuth, User } from "@clerk/nextjs/server";
import { UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";

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

export const GET = async () => {
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
};

export async function DELETE(req: any) {
  const { _id } = await req.json();
  console.log(_id);

  try {
    await connectToDatabase();

    await Post.findByIdAndDelete(_id);

    return new Response("Prompt has been deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete post", {
      status: 500,
    });
  }
}

// PATCH request for editing the prompt
export async function PATCH(req: any) {
  // Retrieve data passed in to update the prompt, should be the post ID and the new post text.
  const { _id, postText } = await req.json();

  try {
    await connectToDatabase();

    // Filter out the current prompt by it's id
    const existingPost = await Post.findById(_id);

    // If there is no existing prompt, then return an error message
    if (!existingPost) {
      return new Response("Prompt does not exist", { status: 404 });
    }

    // If the prompt does exists, then update it to be equal to the one passed in through params
    existingPost.postText = postText;

    // Once updated, just await for it to save in the DB
    await existingPost.save();

    // Return a successful response
    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}
