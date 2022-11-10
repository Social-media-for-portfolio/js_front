import React, {useState} from 'react'
import "./interest-icon.css"

const InterestIcon = ({interestName}) => {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        selected ? setSelected(false) : setSelected(true);
        return
    }
  return (
    <div onClick = {handleClick} className = {`${selected ? "interest-selected" : "interest"} rounded-pill border border-dark d-flex justify-content-center align-items-center my-2`}>
        <h6 className = "my-3 px-3">{interestName}</h6>
    </div>
  )
}

export default InterestIcon