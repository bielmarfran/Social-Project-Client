import React, { useState } from "react";
import getTime from "../helpers/getTime";
import { deleteComment } from "../helpers/api/commentOperations";
import { useHistory } from "react-router-dom";
import { PencilAltIcon as PencilAltIconSolid } from "@heroicons/react/solid";
import { PencilAltIcon as PencilAltIconOutline } from "@heroicons/react/outline";
var baseUrl;
window.location.hostname === "localhost"
  ? (baseUrl = import.meta.env.VITE_API_URL_DEV)
  : (baseUrl = import.meta.env.VITE_API_URL_PRODUTION);

export default function Comment({
  commentData,
  postUuid,
  removeCommentDOM,
  editCommentDOM,
}) {
  let history = useHistory();
  console.log(commentData);
  const [loadProfile, setLoadProfile] = useState(true);
  const [isShow, setIsShown] = useState(false);
  const uuid = commentData.uuid;
  const author = commentData.user.username;
  const body = commentData.body;
  const profilePhoto = commentData.user.profilePicture;
  var time = getTime(commentData.updatedAt);
  time.includes(0) ? "now" : "";
  time.startsWith(0) ? (time = "now") : "";

  const removePost = "";
  return (
    <div id="comment">
      <div className="mb-5 mt-5">
        <hr></hr>
      </div>
      <div className="flex items-center text-xs ">
        <button
          href="#"
          className="font-semibold no-underline hover:underline text-black flex items-center"
          onClick={showProfile}
        >
          {loadProfile ? (
            <img
              id={author}
              className="rounded-full border h-5 w-5"
              src={`${profilePhoto}`}
              onError={setDefaultImg}
            />
          ) : (
            <img
              id={author}
              className="rounded-full border h-5 w-5"
              src="../../img/profile_default.svg"
            />
          )}

          <span className="ml-2">{author}</span>
        </button>
        <span className="text-grey ml-2">{time}</span>
        {commentData.owner ? editComment() : ""}
        {commentData.owner ? removeComment() : ""}
      </div>

      <div className="ml-7 mb-5 mt-5 ">{body}</div>
    </div>
  );
  async function handleClickRemoveComment() {
    const response = await deleteComment(uuid, postUuid);

    if (response.response == "Comment Deleted!") {
      removeCommentDOM(uuid);
    } else if (response.error == "Unauthorized access") {
      history.push("/login", { error: "Unauthorized access / Expired" });
    }
  }
  async function handleClickEditComment() {
    editCommentDOM({ body: body, info: commentData });
  }

  function removeComment() {
    return (
      <div className="ml-auto hover:border 2px border-gray-700 rounded">
        <a onClick={handleClickRemoveComment}>
          <RemoveIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    );
  }
  function editComment() {
    return (
      <div
        className="mr-auto"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {isShow ? (
          <a onClick={handleClickEditComment}>
            <PencilAltIconSolid className="w-5 h-5 ml-2" aria-hidden="true" />
          </a>
        ) : (
          <a onClick={handleClickEditComment}>
            <PencilAltIconOutline className="w-5 h-5 ml-2" aria-hidden="true" />
          </a>
        )}
      </div>
    );
  }
  async function setDefaultImg() {
    setLoadProfile(false);
  }
  async function showProfile() {
    history.push(`/profile/${author}`);
  }
}

// function EditIcon(props) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5 ml-2"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//       />
//     </svg>
//   );
// }

function RemoveIcon(params) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
