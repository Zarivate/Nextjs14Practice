import sha1 from "sha1";

export async function DELETE(req: any) {
  try {
    const { publicId } = await req.json();
    const timestamp = new Date().getTime();
    const string = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = sha1(string);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("signature", signature);
    // Used the non-null asssertion operator "!" to tell Typescript to trust me that it won't be null
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
    formData.append("timestamp", timestamp.toString());

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );
    const responseCloud = await res.json();
    return new Response(JSON.stringify(responseCloud), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Deletion failed", { status: 500 });
  }
}
