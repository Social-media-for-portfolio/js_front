import React from "react";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../sections/Navbar";
import { getAllPosts } from "../../utils/api";
import Post from "../../components/Post";
import PostInput from "../../components/PostInput";
import "./home.css";
import FeedContext from "../../context/feedContext/FeedContext";

const Home = () => {
  const { feed, setFeed } = useContext(FeedContext);

  const retrieveFeed = async () => {
    setFeed(await getAllPosts());
  };

  const postComponents = feed.map((post) => {
    return (
      <Post
        avatar={post.avatar_url}
        username={post.first_name + " " + post.last_name}
        dateTime={post.created_at}
        body={post.content}
      />
    );
  });

  useEffect(() => {
    retrieveFeed();
  }, []);
  return (
    <div className="container-fluid d-flex flex-column">
      <Navbar />
      <div className="post-input">
        <PostInput />
      </div>
      <div className="d-flex flex-column align-items-center my-4">
        {postComponents}
      </div>
    </div>
  );
};

export default Home;
