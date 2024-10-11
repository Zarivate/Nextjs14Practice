import sha1 from "sha1";

// Route for deleting images, was very annoying to figure out as the documentation on the Cloudinary page
// doesn't give much detail regarding mongoose integration and route creation for NextJS applications redirects
// you to a community run library.
// https://support.cloudinary.com/hc/en-us/articles/203465641-How-can-I-delete-an-image-via-the-API-Programmable-Media#3
export async function DELETE(req: any) {
  try {
    // Grab all the necessary fields, beginning with the public id/image id passed in through the request field
    const { publicId } = await req.json();
    // Create a timestamp
    const timestamp = new Date().getTime();
    // Create a string from the passed in fields
    const string = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    // Create a signature for the call by generating a hash from the string above
    const signature = sha1(string);

    // Create a new FormData object
    const formData = new FormData();

    // Add to the formdata object
    formData.append("public_id", publicId);
    formData.append("signature", signature);

    // Used the non-null asssertion operator "!" to tell Typescript to trust me that it won't be null
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
    formData.append("timestamp", timestamp.toString());

    // Make a call to the destroy method of the cloudinary API with the formData object created above as the body
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Capture the response in a variable
    const responseCloud = await res.json();

    // Depending on the response status, respond accordingly
    return new Response(JSON.stringify(responseCloud), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Deletion failed", { status: 500 });
  }
}
