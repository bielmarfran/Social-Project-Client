import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { callAlert } from "../helpers/callAlert";
import { performLogin } from "../helpers/api/authOperations";
import * as Yup from "yup";

function Login({ location }) {
  let history = useHistory();
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    const response = await performLogin(data);
    if (response.response == "Successfully logged in") {
      localStorage.setItem("username", response.username);
      localStorage.setItem("cover", response.photos.cover);
      localStorage.setItem("profile", response.photos.profile);
      history.push("/", { username: response.username });
    } else if (response.error == "Unauthorized access") {
      showAlert(response.error);
    }
  };
  const validationMsg = {
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

    password: Yup.string()
      .required(validationMsg.passwordRequired)
      .min(8, validationMsg.passwordMin)
      .max(32, validationMsg.passwordMax),
  });
  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
              Login
            </h2>
            {typeof location.state !== "undefined"
              ? callAlert(location.state)
              : ""}

            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="mt-10">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  E-mail
                </label>

                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e-mail address"
                  autoComplete="email"
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-500 my-3"
                />

                <label
                  htmlFor="password"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  autoComplete="current-password"
                  className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-500 my-3"
                />

                <button
                  id="performLogin"
                  type="submit"
                  className="w-full py-3 mt-10 bg-blue-400 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-blue-500 hover:shadow-none"
                  //className="w-full h-36 buttonBlue"
                >
                  Login
                </button>

                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                  <a onClick={handleClick} className="flex-2 underline">
                    Create an account
                  </a>
                </div>
                <button
                  id="teste"
                  type="submit"
                  className="w-full py-3 mt-10 bg-green-600 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-green-700 hover:shadow-none"
                  //className="w-full h-36 buttonBlue"
                  onClick={handleClickTestAccount}
                >
                  Test Account
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
  function handleClick() {
    history.push("/register");
  }
  function handleClickTestAccount() {
    localStorage.setItem("Test", "true");
    onSubmit({ email: "test@gmail.com", password: "12345678" });
  }
}

export default withRouter(Login);
