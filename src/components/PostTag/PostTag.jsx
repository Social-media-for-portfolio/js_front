import React, {useState, useEffect} from 'react'
import "./post-tag.css"

const PostTag = ({tagName, tagMap, setTagMap}) => {
    const [selected, setSelected] = useState(false);


    const handleClick = () => {
        const map = {...tagMap};
        if(selected) {
            delete map[tagName];
            setTagMap(map);
            setSelected(false)
        }
        else {
            map[tagName] = true;
            setTagMap(map);
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