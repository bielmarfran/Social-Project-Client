import React from "react";
import { useState, useEffect } from "react";
import { useHistory, withRouter, useParams } from "react-router-dom";
import { getPost } from "../helpers/api/postOperations";
import PostInfo from "../components/Post";
import Header from "../components/header/header";
import Footer from "../components/footer";

function Post({ data }) {
  let { id } = useParams();
  const [post, setPost] = useState([]);
  let history = useHistory();

  useEffect(() => {
    getPost(id).then((response) => {
      if (typeof response.error !== "undefined")
        history.push("/login", { error: "Unauthorized access" });
      if (response == "TypeError: Failed to fetch")
        history.push("/login", { error: "Servidor Off" });

      setPost(response);
    });
  }, []);
  return (
    <div className="bg-gray-200">
      <Header createPost={false} />
      <div className="flex flex-col h-screen justify-between">
        <div id="app" className="mb-auto grid">
          {Object.keys(post).map((i) => (
            <PostInfo postData={post} key={i} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default withRouter(Post);
