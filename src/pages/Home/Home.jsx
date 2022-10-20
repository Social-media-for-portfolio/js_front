import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../sections/Navbar";
import { getAllPosts } from "../../utils/api";
import Post from "../../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const retrieveFeed = async () => {
    setPosts(await getAllPosts());
  };

  const postComponents = posts.map((post) => {
    return (
      <Post
        avatar={post.avatar_url}
        username={post.first_name + " " + post.last_name}
        dateTime={post.created_at}
        body={post.content}
      />
    );
  });

  console.log(postComponents);

  useEffect(() => {
    retrieveFeed();
  }, []);
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column align-items-center my-4">{postComponents}</div>
    </>
  );
};

export default Home;
