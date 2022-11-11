import React, {useState} from 'react'
import "./interest-icon.css"

const InterestIcon = ({interestName, interests, setInterests}) => {
    const [selected, setSelected] = useState(false);
    
    const addNewInterest = () => {
        const newInterests = [...interests, interestName];
        setInterests(newInterests);
        return;
    }
    
    const deleteInterest = async() => {
        const newInterests = interests.filter(interest => interest !== interestName);
        setInterests(newInterests);
        return;
    }
    const handleClick = () => {
        if(selected) {
            deleteInterest();
            setSelected(false);
        }
        else {
            addNewInterest();
            setSelected(true);
        }
    }
  return (
    <div value = {interestName} onClick = {handleClick} className = {`${selected ? "interest-selected" : "interest"} rounded-pill border border-dark d-flex justify-content-center align-items-center my-2`}>
        <h6 className = "my-3 px-3">{interestName}</h6>
    </div>
  )
}

export default InterestIcon