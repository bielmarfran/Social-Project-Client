import React from "react";
import { useState, useEffect } from "react";
import getTime from "../helpers/getTime";
import Comment from "../components/Comment";
import { postComment, putComment } from "../helpers/api/commentOperations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Post({ postData }) {
  const [listComments, setListComments] = useState([]);
  const [editComment, setEditComment] = useState({ edit: false, info: "" });
  const uuid = postData.posts.uuid;
  const topic = postData.posts.topic;
  const author = postData.posts.user.username;
  const title = postData.posts.title;
  const body = postData.posts.body;
  const commentsCount = postData.posts.countComments;
  var time = getTime(postData.posts.createdAt);
  const username = localStorage.getItem("username");

  useEffect(() => {
    setListComments(postData.posts.comments);
  }, []);

  const removeCommentDOM = (data) => {
    const newList = listComments.filter((item) => item.uuid !== data);
    setListComments(newList);
  };

  const editCommentDOM = (data) => {
    setEditComment({ edit: true, info: data.info });
    setInitialValues({ body: data.body });
  };

  const [initialValues, setInitialValues] = useState({
    body: "",
  });

  const onSubmit = async (data, { resetForm }) => {
    const response = await postComment(data, uuid);
    if (response.uuid != null) {
      const newList = [...listComments];
      response["owner"] = true;
      newList.push(response);
      setListComments(newList);
      resetForm({});
    } else if (response.error == "Unauthorized access") {
      history.push("/login", { error: "Unauthorized access / Expired" });
    }
  };

  const onSubmitEdit = async (data, { resetForm }) => {
    const response = await putComment(data, editComment.info.uuid);
    if (response.uuid != null) {
      const newList = [...listComments];
      var id = newList.findIndex(
        (element) => element.uuid == editComment.info.uuid
      );
      response["user"] = editComment.info.user;
      response["owner"] = true;
      newList[id] = response;
      setListComments(newList);
      resetForm({});
      setEditComment({ edit: false, info: "" });
      setInitialValues({ body: "" });
    } else if (response.error == "Unauthorized access") {
      history.push("/login", { error: "Unauthorized access / Expired" });
    }
  };
  const validationMsg = {
    bodyRequired: "Insert a Body!",
    bodyMax: "Maximum 255 characters!",
  };
  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .required(validationMsg.bodyRequired)
      .max(255, validationMsg.bodyMax),
  });

  return (
    <div className="w-full sm:w-10/12 md:8/12 lg:w-7/12  mx-auto py-2 px-10">
      <div className="flex border border-grey-light-alt hover:border-grey rounded bg-white ">
        <div className="w-full pr-4">
          <div className="w-full pt-2 pl-4" id="bodyPost">
            <div className="flex items-center text-xs mb-2">
              <a
                href="#"
                className="font-semibold no-underline hover:underline text-black flex items-center"
              >
                <img
                  className="rounded-full border h-5 w-5"
                  src={`/img/${topic}.svg`}
                />
                <span className="ml-2">{topic}</span>
              </a>
              <span className="text-grey-light mx-1 text-xxs">•</span>
              <span className="text-grey hidden  md:block">Posted by</span>
              <a
                href="#"
                className="text-grey mx-1 no-underline hover:underline"
              >
                {author}
              </a>
              <span className="text-grey">{time}</span>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-1">{title}</h2>
            </div>
            <div className="ml-7 mb-5 mt-5 ">{body}</div>
            <div className="inline-flex items-center my-1">
              <a className="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black">
                <svg
                  className="inline fill-current"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                </svg>
                {commentsCount}
                <span className="hidden md:inline">&nbsp;comments</span>
              </a>
            </div>
            <div className="mb-5 mt-5">
              <hr></hr>
            </div>

            <div className="w-full md:w-full px-3  mt-2">
              <div className="p-0 m-0"></div>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={editComment.edit ? onSubmitEdit : onSubmit}
                validationSchema={validationSchema}
              >
                <Form className="">
                  <p className="text-xs ml-0.5 mb-0.5">
                    Comment as <a className="text-blue-500">{username}</a>
                  </p>
                  <Field
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    as="textarea"
                    id="body"
                    placeholder="Enter your Comment"
                  ></Field>
                  <ErrorMessage
                    name="body"
                    component="span"
                    className="text-red-500 my-3"
                  />
                  <div
                    className="modal-footer py-3 px-5 border0-t text-right"
                    id="commentButton"
                  >
                    {editComment.edit ? (
                      <div className="mt-5">
                        <button type="submit" className="buttonGreen w-36">
                          Edit
                        </button>

                        <button
                          type="button"
                          className="buttonRed"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        id="postComment"
                        type="submit"
                        //className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
                        className="buttonBlue w-36"
                      >
                        Comment
                      </button>
                    )}
                  </div>
                </Form>
              </Formik>

              {Object.keys(listComments).map((i) => (
                <Comment
                  commentData={listComments[i]}
                  postUuid={uuid}
                  key={i}
                  removeCommentDOM={removeCommentDOM}
                  editCommentDOM={editCommentDOM}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function cancelEdit() {
    setEditComment({ edit: false, info: "" });
    setInitialValues({ body: "" });
  }
}
