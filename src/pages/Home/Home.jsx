import React, { useEffect, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import Post from "../../components/Post";
import PostInput from "../../components/PostInput";
import { getAllPosts, getMyUserInfo, getFriendsForUser, getPostTags, getMyInterests} from "../../utils/api";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import "./home.css";

const Home = () => {
  const { userInfo, setUserInfo, setFriends, setRequests} = useContext(AuthContext);
  const { feed, setFeed, setFeedMetrics, setCommentMetrics } =
    useContext(FeedContext);

  const retrieveFeed = async () => {
    const { id, first_name, last_name, avatar_url } = await getMyUserInfo();

    const friendsArr = await getFriendsForUser(id);
    const friendsMap = {};
    for(let friend of friendsArr) {
      friendsMap[friend.id] = true;
    }
    setFriends(friendsMap);
    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });

    //////////Reccomendation Engine////////
    const tags = await getPostTags();
    const tagMap = {};
    for(let tag of tags) {
      if(tag.post_id in tagMap) {
        tagMap[tag.post_id].push(tag.tag)
      }
      else tagMap[tag.post_id] = [tag.tag];
    }

    const myInterests = await getMyInterests();
    const interestMap = {};
    for(let interest of myInterests) {
        interestMap[interest.interest] = true;
    }
    const posts = await getAllPosts();

    for(let post of posts) {
      post.score = 0; 
      if(post.user_id in friendsMap) post.score +=3;
      if(post.id in tagMap) {
        post.tag = [];
        for(let tagName of tagMap[post.id]) {
          post.tag.push(tagName)
          if(tagName in interestMap) {
            post.score ++;
          }
        }

      }
    }
    console.log(posts);
    posts.sort((a, b) => b.score - a.score)
    ////////////Recomendation engine////////////////
    setFeed(posts);

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
  const getPostMetrics = async () => {
    const token = localStorage.getItem("token");
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

  const getOutgoingRequests = async () => {
    try {
      const map = {};
      const token = localStorage.getItem("token");
      if (!token) return;
      const respsonse = await fetch(
        "http://localhost:5000/users/me/friends/outgoing",
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
  useEffect(() => {
    retrieveFeed();
    getPostMetrics();
    getCommentMetrics();
    getOutgoingRequests();
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
