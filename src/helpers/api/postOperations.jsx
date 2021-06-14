import { getApi, deleteApi, postApi } from "./apiCalls";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Test", localStorage.getItem("Test"));

export async function getPost(requestInfo) {
  const request = {
    url: `/posts/${requestInfo}`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await getApi(request);
  return response;
}

export async function createPost(requestInfo) {
  const postTopic = requestInfo.topic;
  const postTitle = requestInfo.title;
  const postBody = requestInfo.body;

  const request = {
    url: `/posts`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({
      topic: postTopic,
      title: postTitle,
      body: postBody,
    }),
  };

  const response = await postApi(request);
  return response;
}

export async function deletePost(requestInfo) {
  const request = {
    url: `/posts/${requestInfo}`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await deleteApi(request);
  return response;
}

export async function getAllPosts(requestInfo) {
  const request = {
    url: `/posts`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await getApi(request);
  return response;
}

export async function getAllPostsTopic(requestInfo) {
  const request = {
    url: `/posts/topic/${requestInfo}`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await getApi(request);
  return response;
}
