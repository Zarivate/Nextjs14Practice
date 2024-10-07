import { FullPostInterface } from "@/constants";

export async function fetchPosts(
  type: string | null | undefined,
  value: string | null | undefined
) {
  const posts = await fetch("/api/posts", {
    method: "GET",
  });
  const data = await posts.json();

  if (type == "home") {
    const homePosts = data.filter(
      (datasnip: FullPostInterface) => datasnip.allowHome == true
    );

    return homePosts;
  } else if (type == "user") {
    const profilePosts = data.filter(
      (datasnip: FullPostInterface) => datasnip.username == value
    );
    return profilePosts;
  } else return data;
}

export async function fetchPosts2(
  type: string | null | undefined,
  value: string | null | undefined
) {
  const posts = await fetch(process.env.URL + "/api/posts", {
    method: "GET",
  });
  const data = await posts.json();

  if (type == "home") {
    const homePosts = data.filter(
      (datasnip: FullPostInterface) => datasnip.allowHome == true
    );

    return homePosts;
  } else if (type == "user") {
    const profilePosts = data.filter(
      (datasnip: FullPostInterface) => datasnip.username == value
    );
    return profilePosts;
  } else return data;
}

export async function handleDeleteGeneral(_id: string) {
  // Make sure user wants to delete the post
  const confirmed = confirm("Are you sure you want to delete this?");

  // If user is sure, make a call to delete
  if (confirmed) {
    try {
      await fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({
          _id: _id,
        }),
      });

      return _id;
    } catch (error) {
      console.log(error);
    }
  }
}
