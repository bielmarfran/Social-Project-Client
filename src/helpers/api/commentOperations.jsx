import React from "react";
import { getApi, postApi, deleteApi, putApi } from "./apiCalls";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Test", localStorage.getItem("Test"));

export async function postComment(requestInfo, uuid) {
  const request = {
    url: `/comment`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ body: requestInfo.body, postUuid: uuid }),
  };
  //console.log(request);
  const response = await postApi(request);

  return response;
}

export async function deleteComment(requestInfo, postUuid) {
  console.log(requestInfo, postUuid);
  const request = {
    url: `/comment/${requestInfo}`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ postUuid: postUuid }),
  };
  console.log(request);
  const response = await deleteApi(request);

  return response;
}

export async function putComment(requestInfo, uuid) {
  const request = {
    url: `/comment`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ body: requestInfo.body, postUuid: uuid }),
  };

  const response = await putApi(request);

  return response;
}
