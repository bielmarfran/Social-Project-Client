import React from "react";
import { postApi, getApi } from "./apiCalls";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Test", localStorage.getItem("Test"));

let headers2 = new Headers();
headers2.append("Test", localStorage.getItem("Test"));

export async function getProfileInfo(requestInfo) {
  const username = requestInfo.username;
  const request = {
    url: `/profile/${username}`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await getApi(request);
  return response;
}

export async function postFile(requestInfo) {
  const formData = new FormData();
  formData.append("myFile", requestInfo.myFile);
  formData.append("place", requestInfo.place);
  const request = {
    url: `/profile/upload`,
    mode: "cors",
    credentials: "include",
    headers: headers2,
    body: formData,
  };
  const response = await postApi(request);
  return response;
}
