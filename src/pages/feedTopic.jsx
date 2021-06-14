import React from "react";
import { useState, useEffect } from "react";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { getAllPostsTopic } from "../helpers/api/postOperations";
import PostCard from "../components/PostCard";
import Header from "../components/header/header";
import Footer from "../components/footer";

function Feed(props) {
  let { topic } = useParams();
  let history = useHistory();
  const [listOfPosts, setListOfPosts] = useState([]);
  const getValue = (data) => {
    const newList = listOfPosts.filter((item) => item.uuid !== data);
    setListOfPosts(newList);
  };

  useEffect(() => {
    getAllPostsTopic(topic).then((response) => {
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
      <img
        src={`/img/${topic}-cover.jpg`}
        alt=""
        className="overflow-hidden object-cover h-56  w-full rounded-t"
      />
      {/* <div className="bg-white h-24">
        <img
          className="flex rounded-full border h-16 w-16  ml-72 "
          src={`/img/${topic}.svg`}
        />
      </div> */}
      <div className="flex flex-col h-screen ">
        <div
          id="app"
          className="mb-auto grid lg:grid-cols-12 lg:justify-items-stretch"
        >
          <div className=" lg:col-span-8 lg:justify-self-auto">
            {listOfPosts.length != 0
              ? Object.keys(listOfPosts).map((i) => (
                  <PostCard
                    postData={listOfPosts[i]}
                    key={i}
                    getValue={getValue}
                  />
                ))
              : "Erros"}
          </div>
          <div className="order-first lg:order-none lg:col-span-3 ">
            <div className="lg:m-3 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-8 mx-8">
              <div className="h-14 bg-gray-600 rounded-t font-medium text-3xl text-white">
                <span className="block my-auto align-middle pl-4 pt-2.5">
                  Info
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-normal text-xl my-2">
                  A block for those with questions about {topic}.
                </h3>
                <h2 className="text-lg my-2">Rules.</h2>
                <div className="flex text-justify">
                  <div className="w-full"></div>
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
