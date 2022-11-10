import React, {useState} from 'react'
import { useEffect } from 'react';
import { addInterest, removeInterest, getMyInterests} from '../../utils/api';
import "./interest-icon.css"

const InterestIcon = ({interestName}) => {
    const [selected, setSelected] = useState(false);
    
    const checkIfSelected = async() => {
        const interestsArr = await getMyInterests();
        for(let interest of interestsArr) {
            if(interest.interest === interestName) {
                setSelected(true);
            }  
        }
        return;
    }
  

    const addNewInterest = async() => {
        await addInterest(interestName);
        return;
    }
    
    const deleteInterest = async() => {
        await removeInterest(interestName);
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
    useEffect(() => {
        checkIfSelected();
    }, []); 
  return (
    <div value = {interestName} onClick = {handleClick} className = {`${selected ? "interest-selected" : "interest"} rounded-pill border border-dark d-flex justify-content-center align-items-center my-2`}>
        <h6 className = "my-3 px-3">{interestName}</h6>
    </div>
  )
}

export default InterestIcon