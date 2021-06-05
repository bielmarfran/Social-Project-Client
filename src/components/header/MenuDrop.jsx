import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { performLogout } from "../../helpers/api/authOperations";
var baseUrl;
window.location.hostname === "localhost"
  ? (baseUrl = import.meta.env.VITE_API_URL_DEV)
  : (baseUrl = import.meta.env.VITE_API_URL_PRODUTION);
export default function MenuDrop() {
  const [loadProfile, setLoadProfile] = useState(true);
  const username = localStorage.getItem("username");
  const profile = localStorage.getItem("profile");
  let history = useHistory();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 mt-0 text-sm font-medium text-black bg-gray-200 rounded-md bg-opacity-20  hover:bg-gray-200">
                {loadProfile ? (
                  <img
                    id="profile"
                    className="rounded-full border  h-11 w-11"
                    src={`${profile}`}
                    onError={setDefaultImg}
                  />
                ) : (
                  <img
                    id="profile"
                    className="rounded-full border  h-11 w-11"
                    src="/img/profile_default.svg"
                  />
                )}

                <div className="ml-4 text-center self-center">
                  {typeof username !== "undefined" ? username : "Username"}
                </div>

                <ChevronDownIcon
                  className="self-center w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={showProfile}
                      >
                        {active ? (
                          <ProfileIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <ProfileIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        <div className="ml-2">Profile</div>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={handleClickLogout}
                      >
                        {active ? (
                          <DuplicateLogoutIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateLogoutIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        <div className="ml-2">Exit</div>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );

  async function handleClickLogout() {
    const response = await performLogout();
    if (response.response == "Logout Successful") {
      history.push("/login", { message: response.response });
    }
  }

  async function showProfile() {
    history.push(`/profile/${username}`);
  }
  async function setDefaultImg() {
    setLoadProfile(false);
  }
}

// function EditInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeWidth={2}
        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
      />
    </svg>
  );
}

// function EditActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function DuplicateInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M4 4H12V12H4V4Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

// function DuplicateActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M4 4H12V12H4V4Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

function DuplicateLogoutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
