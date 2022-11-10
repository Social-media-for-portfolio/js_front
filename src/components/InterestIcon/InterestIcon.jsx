import React, {useState, useContext} from 'react'
import InterestContext from '../../context/interestContext/InterestContext';
import { addInterest, removeInterest } from '../../utils/api';
import "./interest-icon.css"

const InterestIcon = ({interestName, setError, interestsSelected, setInterestsSelected}) => {
    const {myInterests, setMyinterests} = useContext(InterestContext);

    const [selected, setSelected] = useState(false);
    
    // if(interestName in myInterests) {
    //     setSelected(true);
    // }

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
            setInterestsSelected(interestsSelected - 1);
            setSelected(false);
        }
        else {
            setError(false);
            addNewInterest();
            setInterestsSelected(interestsSelected + 1);
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