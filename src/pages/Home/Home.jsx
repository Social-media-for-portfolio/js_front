import React, { useEffect, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import Post from "../../components/Post";
import PostInput from "../../components/PostInput";
import { getAllPosts, getUserInfo } from "../../utils/api";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import "./home.css";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { feed, setFeed} = useContext(FeedContext);

  const retrieveFeed = async () => {
    setFeed(await getAllPosts());
    const { id, first_name, last_name, avatar_url } = await getUserInfo();
    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });
  };

  const postComponents = feed.map((post) => {
    return (
      <Post
        key={post.id}
        postId={post.id}
        userId={post.user_id}
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
    <div className="container-fluid d-flex flex-column p-0">
      <Navbar />
      <div className="post-input">
        <PostInput />
      </div>
      <div className="d-flex flex-column align-items-center my-4">
        {postComponents}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
