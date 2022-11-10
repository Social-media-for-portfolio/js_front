import React from 'react'
import InterestIcon from '../InterestIcon';
import "./interest-card.css"
const InterestCard = ({setError, interestsSelected, setInterestsSelected}) => {
    const interests = ["Animals & Pets",  "Anime", "Art", "Businnes & Finance", "Cars and Motor Vehicles", "Education", "Fashion", "Food and Drinks", "Gaming", "History", "Nature", "Movies", "Music", "Politics", "Programming", "Religion", "Sports", "Science", "Technology","Travel"];
    const interestComponents = interests.map(interest => {
        return <InterestIcon interestName = {interest} setError = {setError} interestsSelected = {interestsSelected} setInterestsSelected = {setInterestsSelected}/>
    })

    const section1 = interestComponents.slice(0, 4);
    const section2 = interestComponents.slice(4, 8);
    const section3 = interestComponents.slice(8, 12);
    const section4 = interestComponents.slice(12, 16);
    const section5 = interestComponents.slice(16, 20)
  return (
    <div className = "mx-3 d-flex justify-content-around">
        <div className = "d-flex flex-column interest-card">
            {section1}
        </div>
        <div className = "d-flex flex-column interest-card">
        {section2}
        </div>
        <div className = "d-flex flex-column interest-card">
        {section3}
        </div>
        <div className = "d-flex flex-column interest-card">
        {section4}
        </div>
        <div className = "d-flex flex-column interest-card">
        {section5}
        </div>
    </div>
  )
}

export default InterestCard;