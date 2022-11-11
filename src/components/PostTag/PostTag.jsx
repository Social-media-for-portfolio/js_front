import React, {useState, useEffect} from 'react'
import "./post-tag.css"

const PostTag = ({tagName, tagMap, setTagMap}) => {
    const [selected, setSelected] = useState(false);

    const checkSelected = () => {
        if(tagName in tagMap) {
            setSelected(true);
            return;
        }
    }

    const handleClick = () => {
        setSelected(!selected)
    }
    useEffect(() => {
        checkSelected();
    }, [])
  return (
    <div onClick = {handleClick}className = {`${selected ? "tag-selected" : "tag"} mx-2 d-flex justify-content-center my-2`}>
        <p>{tagName}</p>
    </div>
  )
}

export default PostTag