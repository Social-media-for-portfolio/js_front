import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import {
  getUserInfo,
  getPostsByUser,
  getAllPosts,
  getMyUserInfo,
} from "../../utils/api";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { setFeed, setFeedMetrics, setCommentMetrics } =
    useContext(FeedContext);

  const retrieveFeed = async () => {
    setFeed(await getAllPosts());
    const { id, first_name, last_name, avatar_url } = await getMyUserInfo();
    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });
  };

  const getPostMetrics = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const map = {};
    const commentResponse = await fetch(
      "http://localhost:5000/feed/comments/metrics",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const commentData = await commentResponse.json();
    for (let commentMetric of commentData) {
      map[commentMetric.post_id] = [parseInt(commentMetric.commentcount), 0];
    }
    const likeResponse = await fetch("http://localhost:5000/feed/posts/likes", {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const likeData = await likeResponse.json();
    for (let likeMetric of likeData) {
      if (likeMetric.post_id in map) {
        map[likeMetric.post_id][1] = parseInt(likeMetric.likecount);
      } else {
        map[likeMetric.post_id] = [0, parseInt(likeMetric.likecount)];
      }
    }
    setFeedMetrics(map);
  };

  const getCommentMetrics = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const map = {};

    const response = await fetch("http://localhost:5000/feed/comments/likes", {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const commentLikesData = await response.json();
    for (let commentLike of commentLikesData) {
      map[commentLike.comment_id] = parseInt(commentLike.likecount);
    }
    setCommentMetrics(map);
  };

  const { id } = useParams();

  console.log(id);

  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState({});

  console.log(userPosts);

  const getUserProfile = async () => {
    const profile = await getUserInfo(id);
    setProfile(profile);
  };
  const getUserPosts = async () => {
    const posts = await getPostsByUser(id);
    setUserPosts(posts);
  };

  console.log(profile);
  useEffect(() => {
    getUserProfile();
    retrieveFeed();
    getUserPosts();
    getPostMetrics();
    getCommentMetrics();
  }, [id]);
  return (
    <div>
      <Navbar />
      <div>userProfile</div>
      <Footer />
    </div>
  );
};

export default UserProfile;
