import React from "react";
import { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getAllPosts } from "../helpers/api/postOperations";
import PostCard from "../components/PostCard";
import Header from "../components/header/header";
import Footer from "../components/footer";

function Feed(props) {
  let history = useHistory();
  const [listOfPosts, setListOfPosts] = useState([]);
  const getValue = (data) => {
    const newList = listOfPosts.filter((item) => item.uuid !== data);
    setListOfPosts(newList);
  };

  useEffect(() => {
    getAllPosts("").then((response) => {
      if (typeof response.error !== "undefined")
        history.push("/login", { error: "Unauthorized access / Expired" });
      if (response == "TypeError: Failed to fetch")
        history.push("/login", { error: "Servidor Off" });

      setListOfPosts(response);
    });
  }, []);

  const addPostDOM = (data) => {
    const newList = [...listOfPosts];
    newList.push(data);
    console.log(newList);
    setListOfPosts(newList);
  };

  return (
    <div className="bg-gray-200">
      <Header createPost={true} addPostDOM={addPostDOM} />
      <div className="flex flex-col h-screen ">
        {/*justify-between */}
        <div
          id="app"
          className="mb-auto grid lg:grid-cols-12 lg:justify-items-stretch"
        >
          <div className=" lg:col-span-8 lg:justify-self-auto">
            {Object.keys(listOfPosts).map((i) => (
              <PostCard postData={listOfPosts[i]} key={i} getValue={getValue} />
            ))}
          </div>
          <div className="order-first lg:order-none lg:col-span-3 ">
            <div class="lg:m-3 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8">
              <img
                src="/img/Outer space-bro.svg"
                alt=""
                class="overflow-hidden object-cover h-24 md:h-32  w-full rounded-t"
              />

              <div class="p-4">
                <h3 class="font-medium text-gray-600 text-lg my-2 uppercase">
                  Topics
                </h3>
                <div class="flex text-justify">
                  <div class="w-full">
                    <ul class="divide-y divide-gray-300">
                      <li
                        class="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          history.push("/food", {
                            error: "Unauthorized access / Expired",
                          });
                        }}
                      >
                        <img
                          className="rounded-full border h-7 w-7 inline mr-2"
                          src={`/img/${"food"}.svg`}
                        />
                        Food
                      </li>
                      <li
                        class="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          history.push("/cars", {
                            error: "Unauthorized access / Expired",
                          });
                        }}
                      >
                        <img
                          className="rounded-full border h-7 w-7 inline mr-2"
                          src={`/img/${"Cars"}.svg`}
                        />
                        Cars
                      </li>
                      <li
                        class="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          history.push("/programing", {
                            error: "Unauthorized access / Expired",
                          });
                        }}
                      >
                        <img
                          className="rounded-full border h-7 w-7 inline mr-2"
                          src={`/img/${"Programing"}.svg`}
                        />
                        Programing
                      </li>
                      <li
                        class="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          history.push("/random", {
                            error: "Unauthorized access / Expired",
                          });
                        }}
                      >
                        <img
                          className="rounded-full border h-7 w-7 inline mr-2"
                          src={`/img/${"Random"}.svg`}
                        />
                        Random
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(Feed);
