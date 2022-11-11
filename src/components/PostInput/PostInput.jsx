import React, { useState, useContext } from "react";
import { DateTime } from "luxon";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import PostTag from "../PostTag";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import { createPost } from "../../utils/api";
import "./post-input.css";

const PostInput = ({ }) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [postContent, setPostContent] = useState("");
  const [dropDown, setDropdown] = useState(false);
  const [tagMap, setTagMap] = useState({});
  const tags = ["Animals & Pets",  "Anime", "Art", "Businnes & Finance", "Cars and Motor Vehicles", "Education", "Fashion", "Food and Drinks", "Gaming", "History", "Nature", "Movies", "Music", "Politics", "Programming", "Religion", "Sports", "Science", "Technology","Travel"];
  console.log(tagMap)
  const tagComponents = tags.map(tag => {
    return <PostTag tagName={tag} tagMap = {tagMap} setTagMap = {setTagMap}/>
  })

    const section1 = tagComponents.slice(0, 4);
    const section2 = tagComponents.slice(4, 8);
    const section3 = tagComponents.slice(8, 12);
    const section4 = tagComponents.slice(12, 16);
    const section5 = tagComponents.slice(16, 20)

  const handleDropdown = () => {
    setDropdown(!dropDown);
    setTagMap({});
  };

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const createNewPostData = (postId) => {
    const { avatarUrl, firstName, lastName, id } = userInfo;
    const post = {
      id: postId,
      user_id: id,
      avatar_url: avatarUrl,
      first_name: firstName,
      last_name: lastName,
      created_at: DateTime.now().toISO(),
      content: postContent,
    };
    return post;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await createPost(postContent);
    const post = createNewPostData(newPost[0].id);
    setFeed([post, ...feed]);
    setPostContent("");
  };
  return (
    <div className = "d-flex flex-column">
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img className="post-input-avatar" src={userInfo.avatarUrl} />
      <form
        className="d-flex justify-content-between w-100"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-100 mx-2 p-2 input-area"
          value={postContent}
          onChange={handleChange}
          type="text"
          placeholder="Write a post..."
        />
          <MdOutlineArrowDropDownCircle
            onClick={handleDropdown}
            className="fs-1 align-self-end mx-1 dropdown-btn"
          />
        <button className="btn btn-success submit-btn h-25 align-self-end">
          Post!
        </button>
      </form>
    </div>
    {dropDown && (
      <div className="d-flex flex-column dropdown-wrapper my-2">
        <h5 className = "align-self-center">Add tags to your post</h5>
      <div className = "d-flex justify-content-between">
          <div className = "d-flex flex-column align-items-center">
          {section1}
          </div>
          <div className = "d-flex flex-column align-items-center">
          {section2}
          </div>
          <div className = "d-flex flex-column align-items-center">
          {section3}
          </div>
          <div className = "d-flex flex-column align-items-center">
          {section4}
          </div>
        </div>
        </div>)
        }
    </div>
  );
};

export default PostInput;
