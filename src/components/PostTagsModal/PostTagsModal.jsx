import React from 'react';
import PostTag from '../PostTag/PostTag';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import "./post-tags-modal.css"

const PostTagsModal = (props) => {
    const {tagComponents} = props;
    
    const section1 = tagComponents.slice(0, 5);
    const section2 = tagComponents.slice(5, 10);
    const section3 = tagComponents.slice(10, 15);
    const section4 = tagComponents.slice(15, 20);
  return (
    <Modal dialogClassName="tags-modal" {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
           Add tags to your post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="justify-content-center">
            <Col xs={6} md={4}>
              {section1}
            </Col>
            <Col xs={6} md={4}>
             {section2}
            </Col>
             <Col xs={6} md={4}>
              {section3}
            </Col> 
            <Col xs={6} md={4}>
              {section4}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PostTagsModal