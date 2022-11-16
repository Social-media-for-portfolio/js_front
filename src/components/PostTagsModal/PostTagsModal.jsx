import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./post-tags-modal.css"

const PostTagsModal = (props) => {
    const {tags} = props;
    const tagList = tags.slice(1, tags.length);
    const tagComponents = tagList.map((tag) => {
        return <div className = "rounded-pill mx-1 post-modal-tag d-flex justify-content-center align-items-center">
            <p className = "px-3 my-1">{tag}</p>
            </div>
    })
    const section1 = tagComponents.slice(0, 5)
    const section2 = tagComponents.slice(5, 10)
    const section3 = tagComponents.slice(10, 15)
    const section4 = tagComponents.slice(15, 20)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Post Tags
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = "d-flex align-items-center mb-3">
            {section1}
        </div>
        <div className = "d-flex align-items-center mb-3">
            {section2}
        </div>
        <div className = "d-flex align-items-center mb-3">
            {section3}
        </div>
        <div className = "d-flex align-items-center mb-3">
            {section4}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PostTagsModal;


