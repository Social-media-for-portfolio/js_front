import React from 'react'
import "./post-tag.css"

const PostTag = ({tagName, tagString, setTagString}) => {
    const handleClick = () => {
        setTagString(tagString)
    }
  return (
    <div onClick = {handleClick}className = "mx-2 tag d-flex justify-content-center my-2">
        <p>{tagName}</p>
    </div>
  )
}

export default PostTag