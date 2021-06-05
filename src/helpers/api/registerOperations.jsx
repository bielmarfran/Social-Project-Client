import React from "react";
import { postApi } from "./apiCalls";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Test", localStorage.getItem("Test"));

export async function performRegister(requestInfo) {
  const usernameUser = requestInfo.username;
  const emailUser = requestInfo.email;
  const passwordUser = requestInfo.password;

  const request = {
    url: `/auth/register`,
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({
      username: usernameUser,
      email: emailUser,
      password: passwordUser,
    }),
  };
  const response = await postApi(request);
  return response;
}
