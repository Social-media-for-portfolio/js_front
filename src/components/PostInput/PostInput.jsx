import React, { useState, useContext } from "react";
import { DateTime } from "luxon";
import { IoIosPricetags } from "react-icons/io";
import PostTag from "../PostTag";
import PostTagsModal from "../PostTagsModal";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import { createPost, } from "../../utils/api";
import "./post-input.css";

const PostInput = ({ tags, setTags }) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [postContent, setPostContent] = useState("");
  const [dropDown, setDropdown] = useState(false);
  const [tagArray, setTagArray] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const tagList = ["Animals & Pets",  "Anime", "Art", "Businnes & Finance", "Cars and Motor Vehicles", "Education", "Fashion", "Food and Drinks", "Gaming", "History", "Nature", "Movies", "Music", "Politics", "Programming", "Religion", "Sports", "Science", "Technology","Travel"];
  const tagComponents = tagList.map(tag => {
    return <PostTag tagName={tag} tagArray = {tagArray} setTagArray = {setTagArray}/>
  })

    // const section1 = tagComponents.slice(0, 4);
    // const section2 = tagComponents.slice(4, 8);
    // const section3 = tagComponents.slice(8, 12);
    // const section4 = tagComponents.slice(12, 16);
    // const section5 = tagComponents.slice(16, 20)

  const handleDropdown = () => {
    setDropdown(!dropDown);
    setTagArray([]);
  };

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const createNewPostData = (postId) => {
    console.log(tagArray)
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
    const newPost = await createPost(postContent, tagArray);
    const newPostId = newPost[0].id
    const post = createNewPostData(newPostId);
    setFeed([post, ...feed]);
    const tagMap = {...tags};
    tagMap[newPostId] = [0, ...tagArray];
    setTags(tagMap)
    setPostContent("");
    setDropdown(false);
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
          <IoIosPricetags
            onClick={() => setModalShow(true)}
            className="fs-2 align-self-end mx-1 dropdown-btn"
          />
        <button className="mx-2 btn btn-success submit-btn h-25 align-self-end">
          Post!
        </button>
      </form>
    </div>

      <PostTagsModal tagComponents = {tagComponents} show={modalShow} onHide={() => setModalShow(false)} />
    {/* {dropDown && (
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
          <div className = "d-flex flex-column align-items-center">
          {section5}
          </div>
        </div>
        </div>
        )} */}
    </div>
  );
};

export default PostInput;
