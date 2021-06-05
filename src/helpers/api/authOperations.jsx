import React from "react";
import { postApi, getApi } from "./apiCalls";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Test", localStorage.getItem("Test"));

export async function performLogin(requestInfo) {
  const emailUser = requestInfo.email;
  const passwordUser = requestInfo.password;
  const request = {
    url: `/auth`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ email: emailUser, password: passwordUser }),
  };
  const response = await postApi(request);
  return response;
}

export async function performLogout() {
  const request = {
    url: `/auth/logout`,
    mode: "cors",
    credentials: "include",
    headers: headers,
  };
  const response = await postApi(request);
  return response;
}
