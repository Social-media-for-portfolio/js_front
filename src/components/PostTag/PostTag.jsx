import React, {useState, useEffect} from 'react'
import "./post-tag.css"

const PostTag = ({tagName, tagArray, setTagArray}) => {
    const [selected, setSelected] = useState(false);


    const handleClick = () => {
        const array = [...tagArray];
        if(selected) {
            const newTags = array.filter(tag => tag !== tagName);
            setTagArray(newTags);
            setSelected(false)
        }
        else {
            array.push(tagName);
            setTagArray(array);
            setSelected(true);
        } 
    }
  return (
    <div onClick = {handleClick}className = {`${selected ? "tag-selected" : "tag"} mx-2 d-flex justify-content-center my-2`}>
        <p>{tagName}</p>
    </div>
  )
}

export default PostTag