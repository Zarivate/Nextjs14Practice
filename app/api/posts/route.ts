// Route file that handles all the possible methods a post can use
import { connectToDatabase } from "@/lib/database/mongoose";
import { Post } from "@/lib/database/models/posts.model";
import { getAuth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";

// Function to handle making POSTS to the database
export async function POST(req: any) {
  // Grab the clerk userId using the built in auth method
  const { userId } = getAuth(req);

  // Grab the userdata using the clerk ID
  const userData = await getUserById(userId!, null);

  // Get the privacy state value of the user
  const privacySet = userData.privacySet;

  // Grab the other user details from the passed in request
  const { email, username, postText, liveTime, allowHome, imageUrl } =
    await req.json();

  // Create the deletion date by adding the passed in "liveTime" in milliseconds to the current date
  const expireAt = new Date(new Date().getTime() + liveTime * 1000);

  // Attempt to connect to the database and make a POST document with the aquired data
  try {
    await connectToDatabase();

    const newPost = new Post({
      userId,
      email,
      username,
      postText,
      expireAt,
      allowHome,
      imageUrl,
      privacySet,
    });

    // Make it so the documents in the database are expired right at the moment they reach their expireAt Date, due to the mongodb deletion reaper running
    // every 60 seconds however, documents may persist for up to a minute past their actual deletion date.
    Post.schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
    await newPost.save();

    // Return a success status and stringified version of the newly made post, else if it failed return
    // an error status
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the post", { status: 500 });
  }
}

// Function to handle the GET method, any calls for post retrival are handled here
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

// Method to handle deleting a post
export async function DELETE(req: any) {
  // Grab the post id from the passed in request
  const { _id } = await req.json();

  // Attempt to connect to the database and delete the document using Mongoose's built in method for
  // deleting a single document.
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
  // Grab the passed in data from the request field, should be the new textbody of the post
  const data = await req.json();

  try {
    await connectToDatabase();

    // Filter out the current prompt by it's id
    const existingPost = await Post.findById(data._id);

    // If there is no existing prompt, then return an error message
    if (!existingPost) {
      return new Response("Prompt does not exist", { status: 404 });
    }

    // If the prompt does exists, then update it to be equal to the one passed in through params
    if (data.type == "FEED") {
      existingPost.postText = data.postText;
    } else {
      existingPost.postText = data.postText;
      existingPost.privacySet = data.privacySet;
    }

    // Once updated, just await for it to save in the DB
    await existingPost.save();

    // Return an appropriate response
    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}
