import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useEffect, useState } from "react";
import { createPost } from "../../helpers/api/postOperations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Modal(props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef();

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }
  const initialValues = {
    topic: "",
    title: "",
    body: "",
  };

  const onSubmit = async (data) => {
    const response = await createPost(data);
    if (response.uuid != null) {
      props.addPostDOM(response);
      closeModal();
    } else if (response.error == "Unauthorized access") {
      showAlert(response.error);
    }
  };
  const validationMsg = {
    topicRequired: "Choose a Topic!",
    titleRequired: "Enter a Title!",
    bodyRequired: "Insert a Body!",
    bodyMax: "Maximum 255 characters!",
  };
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required(validationMsg.topicRequired),
    title: Yup.string().required(validationMsg.titleRequired),
    body: Yup.string()
      .required(validationMsg.bodyRequired)
      .max(255, validationMsg.bodyMax),
  });

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-6 py-2 mx-2 text-md font-bold text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Create Post
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {props.title}
                </Dialog.Title>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="mt-10">
                    <div className="py-1">
                      <label htmlFor="topic" className="mr-2">
                        Choose Topic:
                      </label>

                      <div className="relative inline-flex">
                        <svg
                          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 412 232"
                        >
                          <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fillRule="nonzero"
                          />
                        </svg>
                        <Field
                          as="select"
                          id="topic"
                          name="topic"
                          className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                        >
                          <option value=""></option>
                          <option value="Food">Food</option>
                          <option value="Cars">Cars</option>
                          <option value="Programing">Programing</option>
                          <option value="Random">Random</option>
                        </Field>
                      </div>
                      <div className="">
                        <ErrorMessage
                          name="topic"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>
                    </div>
                    <div className="py-1">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Title
                      </label>

                      <Field
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title of Post"
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        required
                      />
                      <div className="">
                        <ErrorMessage
                          name="title"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>
                    </div>
                    <div className="py-1">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Body Post
                      </label>

                      <Field
                        as="textarea"
                        id="body"
                        name="body"
                        placeholder="Body"
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        required
                      />
                      <div className="">
                        <ErrorMessage
                          name="body"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <button type="submit" className="buttonBlue w-36">
                        Create
                      </button>

                      <button
                        type="button"
                        className="buttonRed"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
