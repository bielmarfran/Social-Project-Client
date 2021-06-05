import React from "react";

export default function getTimeFull(time) {
  const datePost = new Date(time);
  const day = datePost.getDay();
  const month = datePost.toLocaleString("default", { month: "long" });
  const year = datePost.getFullYear();
  return `${month} of ${year}`;
}
