import React, {useState, useContext} from "react";
import { DateTime } from "luxon";
import PostTag from "../PostTag";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { createPost } from "../../utils/api";
import "./post-input-modal.css";

const PostInputModal = (props) => {
  const {tags, setTags, postContent, setPostContent, setModalShow} = props
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [tagArray, setTagArray] = useState([]);
  const tagList = ["Animals & Pets",  "Anime", "Art", "Businnes & Finance", "Cars and Motor Vehicles", "Education", "Fashion", "Food and Drinks", "Gaming", "History", "Nature", "Movies", "Music", "Politics", "Programming", "Religion", "Sports", "Science", "Technology","Travel"];
  console.log(tagArray)
  const tagComponents = tagList.map(tag => {
    return <PostTag tagName={tag} tagArray = {tagArray} setTagArray = {setTagArray}/>
  })

  const section1 = tagComponents.slice(0, 5);
  const section2 = tagComponents.slice(5, 10);
  const section3 = tagComponents.slice(10, 15);
  const section4 = tagComponents.slice(15, 20);

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
    console.log(post)
    return post;
  };
  
  const handlePost = async (e) => {
    e.preventDefault();
    const newPost = await createPost(postContent, tagArray);
    const newPostId = newPost[0].id
    const post = createNewPostData(newPostId);
    setFeed([post, ...feed]);
    const tagMap = {...tags};
    tagMap[newPostId] = [0, ...tagArray];
    setTags(tagMap)
    setPostContent("");
    setTagArray([]);
    setModalShow(false);
  };

  const closeModal = () => {
    setTagArray([]);
    setModalShow(false);
  }
  return (
    <Modal
      dialogClassName="tags-modal"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add tags to your post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row md="4">
            <Col className="d-flex flex-column align-items-center">
              {section1}
            </Col>
            <Col className="d-flex flex-column align-items-center">
              {section2}
            </Col>
            <Col className="d-flex flex-column align-items-center">
              {section3}
            </Col>
            <Col className="d-flex flex-column align-items-center">
              {section4}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "danger"onClick={closeModal}>Close</Button>
        <Button variant="success" onClick = {handlePost}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostInputModal;
