import React from "react";
import { useState } from "react";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { callAlert } from "../helpers/callAlert";
import { performRegister } from "../helpers/api/registerOperations";
import * as Yup from "yup";

function Register() {
  var [msg, setMsg] = useState("");
  let history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await performRegister(data);
    console.log(response);
    if (response.response === "Account created successfully") {
      history.push("/login", { message: response.response });
    } else if (response.error == "Email already in use!") {
      setMsg(response.error);
    } else if (response.error == "Username already in use!") {
      setMsg(response.error);
    }
  };
  const validationMsg = {
    usernameMin: "Minimum 4 characters!",
    usernameRequired: "Please enter a username!",
    email: "Please enter a valid email!",
    emailRequired: "Please enter an email!",
    passwordRequired: "Please enter a password!",
    passwordMin: "Minimum 8 characters!",
    passwordMax: "Maximum 32 characters!",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(validationMsg.emailRequired)
      .email(validationMsg.email),

    username: Yup.string()
      .required(validationMsg.usernameRequired)
      .min(4, validationMsg.usernameMin),

    password: Yup.string()
      .required(validationMsg.passwordRequired)
      .min(8, validationMsg.passwordMin)
      .max(32, validationMsg.passwordMax),

    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(validationMsg.passwordRequired)
      .min(8, validationMsg.passwordMin)
      .max(32, validationMsg.passwordMax),
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="md:mt-6">
                  <div className="text-5xl text-center font-semibold text-black">
                    Social
                  </div>
                  <div className="text-3xl text-center font-base text-black mt-4">
                    Registration
                  </div>
                  {msg === "" ? "" : callAlert(msg)}
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    <Form className="mt-8">
                      <div className="py-1">
                        <label
                          htmlFor="usernameUser"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Username
                        </label>
                        <Field
                          id="usernameUser"
                          type="text"
                          name="username"
                          placeholder="Username"
                          autoComplete="username"
                          className="inputRegister"
                          required
                        />
                        <ErrorMessage
                          name="username"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>

                      <div className="py-1">
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Email
                        </label>
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          placeholder="email"
                          autoComplete="email"
                          className="inputRegister"
                          required
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>

                      <div className="py-1">
                        <label
                          htmlFor="password"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Password
                        </label>
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          placeholder="password"
                          autoComplete="current-password"
                          className="inputRegister"
                          required
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>

                      <div className="py-1">
                        <label
                          htmlFor="password_confirm"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Confirm Password
                        </label>
                        <Field
                          id="password_confirm"
                          type="password"
                          name="password_confirm"
                          placeholder="password"
                          autoComplete="current-password"
                          className="inputRegister"
                          required
                        />
                        <ErrorMessage
                          name="password_confirm"
                          component="span"
                          className="text-red-500 my-3"
                        />
                      </div>
                      <div className="flex justify-start mt-4">
                        <span className="text-red-500 hidden" id="errorEmail">
                          The email is incorrect.
                        </span>
                        <span
                          className="text-red-500 hidden"
                          id="errorPassword"
                        >
                          The passwords are different.
                        </span>
                      </div>
                      <button
                        id="performRegister"
                        type="submit"
                        className="button"
                      >
                        Register
                      </button>
                    </Form>
                  </Formik>

                  <div className="flex justify-start mt-4">
                    <a
                      onClick={handleClick}
                      className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500"
                    >
                      Have an account?
                      <span className="text-black font-semibold"> Login </span>
                    </a>
                  </div>

                  <div className="text-sm font-semibold block sm:hidden py-6 flex justify-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function handleClick() {
    history.push("/login");
  }
}
export default withRouter(Register);
