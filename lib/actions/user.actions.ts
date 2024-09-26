"use server";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { CreateUserParams, UpdateUserParams, UpdateUserParams2 } from "@/types";

// Server directives that handle the user functionality aspects, the alternative to the more traditional API routes

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    // Because this application is technically serverless and the connection doesn't persist, a connection to the database has to be made every call.
    // Since it caches the connection however, this shouldn't take too long each time
    await connectToDatabase();

    // Creates a new user using the User model, the user data itself comes from the frontend and has it's type declared in the index.d.ts file
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(
  userId: string | null,
  username: string | null
) {
  try {
    await connectToDatabase();

    // Check to see whether username isn't empty/null. If so means checking to see whether user allows their profile to be seen or not
    if (username) {
      const user = await User.findOne({ username: username });

      if (!user) return "User doesn't exist";

      return JSON.parse(JSON.stringify(user));
    } else {
      const user = await User.findOne({ clerkId: userId });

      if (!user) throw new Error("User not found");

      return JSON.parse(JSON.stringify(user));
    }
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserConfirm(username: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: username });

    if (!user) return false;

    return true;
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(
  clerkId: string,
  user: UpdateUserParams | UpdateUserParams2
) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
