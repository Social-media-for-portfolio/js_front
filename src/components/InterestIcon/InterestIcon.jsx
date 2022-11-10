import React, {useState} from 'react'
import "./interest-icon.css"

const InterestIcon = ({interestName, setError, interestsSelected, setInterestsSelected}) => {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        if(selected) {
            setInterestsSelected(interestsSelected - 1);
            setSelected(false);
        }
        else {
            setError(false);
            setInterestsSelected(interestsSelected + 1);
            setSelected(true);
        }
    }
  return (
    <div onClick = {handleClick} className = {`${selected ? "interest-selected" : "interest"} rounded-pill border border-dark d-flex justify-content-center align-items-center my-2`}>
        <h6 className = "my-3 px-3">{interestName}</h6>
    </div>
  )
}

export default InterestIcon