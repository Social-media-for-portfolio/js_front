import React, { useState, useContext} from "react";
import AuthContext from "../../context/authContext/AuthContext";
import PostInputModal from "../PostInputModal";
import "./post-input.css";

const PostInput = ({ tags, setTags }) => {
  const { userInfo } = useContext(AuthContext);
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setPostContent(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(postContent.length < 1) {
      setError(true);
      return;
    }
    setModalShow(true);
  }

  return (
    <div className = "d-flex flex-column">
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img className="post-input-avatar" src={userInfo.avatarUrl} />
      <form
        className="d-flex justify-content-between w-100"
      >
        <textarea
          className="w-100 mx-2 p-2 input-area"
          value={postContent}
          onChange={handleChange}
          type="text"
          placeholder="Write a post..."
        />
        <button onClick = {handleClick} className="mx-2 btn btn-success submit-btn h-25 align-self-end">
          Post!
        </button>
      </form>
    </div>
      {error && (
        <p className = " my-2 align-self-center error">Your post can't be empty</p>
      )}
      <PostInputModal setModalShow = {setModalShow} postContent = {postContent} setPostContent = {setPostContent} tags = {tags} setTags = {setTags} show={modalShow}/>
    </div>
  );
};

export default PostInput;
