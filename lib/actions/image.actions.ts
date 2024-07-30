"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

export async function updateImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    revalidatePath(path);

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}
