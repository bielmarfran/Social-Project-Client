import React from "react";
var baseUrl;
window.location.hostname === "localhost"
  ? (baseUrl = import.meta.env.VITE_API_URL_DEV)
  : (baseUrl = import.meta.env.VITE_API_URL_PRODUTION);

export async function getApi(request) {
  try {
    const response = await fetch(baseUrl + request.url, {
      mode: request.mode,
      method: "GET",
      credentials: request.credentials,
      headers: request.headers,
      //body: { test: test },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export async function postApi(request) {
  try {
    const response = await fetch(baseUrl + request.url, {
      mode: request.mode,
      method: "POST",
      credentials: request.credentials,
      headers: request.headers,
      body: request.body,
    });

    if (response.status == 500 || response.status == 404) {
      return { error: "No Server" };
    }
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function putApi(request) {
  try {
    const response = await fetch(baseUrl + request.url, {
      mode: request.mode,
      method: "PUT",
      credentials: request.credentials,
      headers: request.headers,
      body: request.body,
    });
    if (response.status == 500 || response.status == 404) {
      return { error: "No Server" };
    }
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export async function deleteApi(request) {
  try {
    const response = await fetch(baseUrl + request.url, {
      mode: request.mode,
      method: "DELETE",
      credentials: request.credentials,
      headers: request.headers,
      body: request.body,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
