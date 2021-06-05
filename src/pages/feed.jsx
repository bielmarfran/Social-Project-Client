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
      <div className="flex flex-col h-screen justify-between">
        <div id="app" className="mb-auto grid">
          {Object.keys(listOfPosts).map((i) => (
            <PostCard postData={listOfPosts[i]} key={i} getValue={getValue} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(Feed);
