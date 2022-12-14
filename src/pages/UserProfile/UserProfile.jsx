import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post";
import ToggleActivites from "../../components/ToggleActivities/ToggleActivites";
import UserProfileCard from "../../components/UserProfileCard";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import Footer from "../../sections/Footer";
import Navbar from "../../sections/Navbar";
import {
  getAllPosts,
  getFriendsForUser,
  getMyUserInfo,
  getPostsWithUserComments,
  getPostTags,
  getUserInfo,
} from "../../utils/api";

const UserProfile = () => {
  const { userInfo, setUserInfo, setRequests, setFriends } =
    useContext(AuthContext);
  const { setFeed, feed, setFeedMetrics, setCommentMetrics } =
    useContext(FeedContext);

  const [toggle, setToggle] = useState("posts");
  const [userFriends, setUserFriends] = useState([]);
  const [profile, setProfile] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [tags, setTags] = useState({});
  const { id } = useParams();
  const profileFeed = feed.filter((post) => post.user_id === profile.id);

  const retrieveFeed = async () => {
    const tagsArr = await getPostTags();
    const tagMap = {};
    for (let tag of tagsArr) {
      tagMap[tag.post_id]
        ? tagMap[tag.post_id].push(tag.tag)
        : (tagMap[tag.post_id] = [0, tag.tag]);
    }
    setTags(tagMap);
    setFeed(await getAllPosts());
    const { id, first_name, last_name, avatar_url } = await getMyUserInfo();

    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });

    const friendsArr = await getFriendsForUser(id);
    const map = {};

    for (let friend of friendsArr) {
      map[friend.id] = true;
    }
    setFriends(map);
  };

  const getPostMetrics = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const map = {};
    const commentResponse = await fetch(
      "https://emir-connect.herokuapp.com/feed/comments/metrics",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      }
    );
    const commentData = await commentResponse.json();
    for (let commentMetric of commentData) {
      map[commentMetric.post_id] = [parseInt(commentMetric.commentcount), 0];
    }
    const likeResponse = await fetch("https://emir-connect.herokuapp.com/feed/posts/likes", {
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

    const response = await fetch("https://emir-connect.herokuapp.com/feed/comments/likes", {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    });
    const commentLikesData = await response.json();
    for (let commentLike of commentLikesData) {
      map[commentLike.comment_id] = parseInt(commentLike.likecount);
    }
    setCommentMetrics(map);
  };

  const getFriends = async () => {
    setUserFriends(await getFriendsForUser(Number(id)));
  };

  const getUserProfile = async () => {
    const profile = await getUserInfo(id);
    setProfile(profile);
  };

  const getUserComments = async () => {
    const postsWithUserComments = await getPostsWithUserComments(id);
    setUserComments(postsWithUserComments);
  };

  const getOutgoingRequests = async () => {
    try {
      const map = {};
      const token = localStorage.getItem("token");
      if (!token) return;
      const respsonse = await fetch(
        "https://emir-connect.herokuapp.com/users/me/friends/outgoing",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        }
      );
      const parseRes = await respsonse.json();
      for (let user of parseRes) {
        map[user.id] = true;
      }
      setRequests(map);
    } catch (error) {
      console.error("error");
    }
  };

  const postCommentComponents = userComments.map((post) => {
    return (
      <Post
        key={post.id}
        postId={post.id}
        userId={post.user_id}
        avatar={post.avatar_url}
        username={post.first_name + " " + post.last_name}
        dateTime={post.created_at}
        body={post.content}
        tags={tags[post.id] ? tags[post.id] : []}
      />
    );
  });

  const postComponents = profileFeed.map((post) => {
    return (
      <Post
        key={post.id}
        postId={post.id}
        userId={post.user_id}
        avatar={post.avatar_url}
        username={post.first_name + " " + post.last_name}
        dateTime={post.created_at}
        body={post.content}
        tags={tags[post.id] ? tags[post.id] : []}
      />
    );
  });

  useEffect(() => {
    retrieveFeed();
    getUserProfile();
    getUserComments();
    getPostMetrics();
    getCommentMetrics();
    getFriends();
    getOutgoingRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <div className="content">
        <div className="d-flex flex-column align-items-center mt-3">
          <UserProfileCard
            userFriends={userFriends}
            setUserFriends={setUserFriends}
            profile={profile}
            setProfile={setProfile}
            userId={id}
            avatar={profile.avatar_url}
            firstName={profile.first_name}
            lastName={profile.last_name}
            bio={profile.bio}
            location={profile.location}
            birthday={profile.birthday}
          />
        </div>
        <div className="mt-4">
          <ToggleActivites toggle={toggle} setToggle={setToggle} />
          <div className="d-flex flex-column align-items-center">
            {toggle === "posts" ? postComponents : postCommentComponents}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
