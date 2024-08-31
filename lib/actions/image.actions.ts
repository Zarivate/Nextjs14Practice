"use server";

import { handleError } from "../utils";

export async function deleteImage(publicId: string) {
  try {
    const res = await fetch(process.env.URL + "/api/images/", {
      method: "DELETE",
      body: JSON.stringify({
        publicId: publicId,
      }),
    });

    const deletedImageData = await res.json();

    return JSON.parse(JSON.stringify(deletedImageData));
  } catch (error) {
    handleError(error);
  }
}
