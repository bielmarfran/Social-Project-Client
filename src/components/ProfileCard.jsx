import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import {
  StarIcon,
  ChatIcon,
  PencilIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { callAlert } from "../helpers/callAlert";
import getTimeFull from "../helpers/getTimeFull";
import { postFile } from "../helpers/api/profileOperations";
var baseUrl;
window.location.hostname === "localhost"
  ? (baseUrl = import.meta.env.VITE_API_URL_DEV)
  : (baseUrl = import.meta.env.VITE_API_URL_PRODUTION);
export default function ProfileCard({ profileData }) {
  let history = useHistory();
  const [fileCover, setFileCover] = useState({ show: false, file: "" });
  const [fileProfile, setFileProfile] = useState({ show: false, file: "" });
  const [loadProfile, setLoadProfile] = useState(true);
  const [loadCover, setLoadCover] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div className="w-full sm:w-10/12 md:8/12 lg:w-7/12  mx-auto py-2 px-10 z-0">
      {showAlert ? callAlert(alertMessage) : ""}
      <div className="flex border border-grey-light-alt hover:border-grey rounded bg-white hover:shadow-lg">
        <div className="grid grid-cols-2 gap-1 w-full">
          <div className="col-span-2">
            <div className="top h-64 w-full bg-blue-600 overflow-hidden relative rounded">
              {loadCover ? (
                <img
                  src={`${profileData.coverPicture}`}
                  onError={setDefaultCoverImg}
                  alt="Cover Image"
                  className="bg w-full h-full object-cover object-center absolute z-0"
                ></img>
              ) : (
                <img
                  src={`/img/default_cover.jpg`}
                  alt="Cover Image"
                  className="bg w-full h-full object-cover object-center absolute z-0"
                ></img>
              )}

              <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                {loadProfile ? (
                  <img
                    id="profile"
                    className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-solid border-4 border-gray-800"
                    src={`${profileData.profilePicture}`}
                    onError={setDefaultImg}
                  />
                ) : (
                  <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-solid border-4 border-gray-800 ">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
                <h1 className="text-2xl font-semibold">
                  {profileData.username}
                </h1>
                <h4 className="text-sm font-semibold">
                  {getTimeFull(profileData.createdAt)}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full p-5">
              <div className="widget w-full p-4 rounded-lg bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-xs uppercase font-light text-gray-500">
                      POST
                    </div>
                    <div className="text-xl font-bold">
                      {profileData.length !== undefined
                        ? profileData.username
                        : profileData.countPosts}
                    </div>
                  </div>
                  <PencilIcon className="self-center w-7 h-7 ml-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full p-5">
              <div className="widget w-full p-4 rounded-lg bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-xs uppercase font-light text-gray-500">
                      COMMENTS
                    </div>
                    <div className="text-xl font-bold">
                      {profileData.length !== undefined
                        ? profileData.username
                        : profileData.countComments}
                    </div>
                  </div>
                  <ChatIcon className="self-center w-7 h-7 ml-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full p-5">
              <div className="widget w-full p-4 rounded-lg bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-xs uppercase font-light text-gray-500">
                      REPUTATION
                    </div>
                    <div className="text-xl font-bold">75</div>
                  </div>
                  <BadgeCheckIcon className="self-center w-7 h-7 ml-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full p-5">
              <div className="widget w-full p-4 rounded-lg bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-xs uppercase font-light text-gray-500">
                      STARS
                    </div>
                    <div className="text-xl font-bold">1</div>
                  </div>
                  <StarIcon className="self-center w-7 h-7 ml-auto" />
                </div>
              </div>
            </div>
          </div>
          {profileData.owner ? (
            <div className="col-span-2">
              <div className="col-span-2 p-5">
                <label className="block text-sm font-medium text-gray-700">
                  Profile photo
                </label>
                <Dropzone
                  onDrop={(acceptedFiles, fileRejections) =>
                    uploadProfile(acceptedFiles, fileRejections)
                  }
                  accept={"image/jpeg, image/png"}
                  maxSize={5242880}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        {fileProfile.show ? (
                          <div>
                            <XIcon
                              className="self-center w-8 h-8 ml-auto"
                              aria-hidden="true"
                              onClick={hideImgProfile}
                            />
                            <img
                              id="frameProfile"
                              src=""
                              alt=""
                              className="w-auto h-auto max-h-80  rounded"
                            ></img>{" "}
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Upload a file</span>
                                <input {...getInputProps()} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="col-span-2 p-5">
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <Dropzone
                  onDrop={(acceptedFiles, fileRejections) =>
                    uploadCover(acceptedFiles, fileRejections)
                  }
                  accept={"image/jpeg, image/png"}
                  maxSize={5242880}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        {fileCover.show ? (
                          <div>
                            <XIcon
                              className="self-center w-8 h-8 ml-auto"
                              aria-hidden="true"
                              onClick={hideImgCover}
                            />
                            <img
                              id="frameCover"
                              src=""
                              alt=""
                              className="w-auto h-auto max-h-80  rounded"
                            ></img>{" "}
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Upload a file</span>
                                <input {...getInputProps()} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="col-span-2 p-5">
                <button
                  type="button"
                  //className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  className="buttonBlue w-full"
                  onClick={saveFiles}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
  function uploadCover(acceptedFiles, fileRejections) {
    if (fileRejections.length > 0) {
      setShowAlert(true);
      setAlertMessage(fileRejections[0].errors[0].message);
    } else {
      const file = acceptedFiles;
      setFileCover({ show: true, file: file[0] });
      frameCover.src = URL.createObjectURL(file[0]);
    }
  }
  function uploadProfile(acceptedFiles, fileRejections) {
    if (fileRejections.length > 0) {
      setShowAlert(true);
      setAlertMessage(fileRejections[0].errors[0].message);
    } else {
      setShowAlert(false);
      const file = acceptedFiles;
      setFileProfile({ show: true, file: file[0] });
      frameProfile.src = URL.createObjectURL(file[0]);
    }
  }
  function hideImgProfile() {
    setFileProfile({ show: false, file: "" });
  }
  function hideImgCover() {
    setFileCover({ show: false, file: "" });
  }
  async function setDefaultImg() {
    if (profileData.length != 0) {
      setLoadProfile(false);
    }
  }
  async function setDefaultCoverImg() {
    if (profileData.length != 0) {
      setLoadCover(false);
    }
  }
  async function saveFiles() {
    try {
      if (fileProfile.file !== undefined) {
        const response = await postFile({
          myFile: fileProfile.file,
          place: "profile",
        });
        if (response.response != null) {
          localStorage.setItem("profile", response.user.profilePicture);
          profileData.profilePicture = response.user.profilePicture;
          setLoadProfile(true);
          setFileProfile({ show: false, file: "" });
        } else if (response.error == "Unauthorized access") {
          history.push("/login", { error: "Unauthorized access / Expired" });
        }
      }
    } catch (error) {
      console.warn(error);
    }
    try {
      if (fileCover.file !== undefined) {
        const response = await postFile({
          myFile: fileCover.file,
          place: "cover",
        });
        if (response.response != null) {
          localStorage.setItem("cover", response.user.coverPicture);
          profileData.coverPicture = response.user.coverPicture;
          setLoadCover(true);
          setFileCover({ show: false, file: "" });
        } else if (response.error == "Unauthorized access") {
          history.push("/login", { error: "Unauthorized access / Expired" });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
}

{
  /* <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            About
          </label>
          <div className="mt-1">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
              defaultValue={""}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div> */
}

{
  /* <div>
            {" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 ml-12 mt-4 mb-4">
                Avatar
              </label>
              <div className="mt-1 flex items-center mt-10 ml-5">
                <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <button
                type="button"
                className="ml-8 mt-4 mb-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change
              </button>
            </div>
          </div> */
}
