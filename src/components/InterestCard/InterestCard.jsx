import React from 'react'
import InterestIcon from '../InterestIcon';
const InterestCard = () => {
    const interests = ["Animals and Pets",  "Anime", "Art", "Businnes & Finance", "Cars and Motor Vehicles", "Fashion", "Food and Drinks", "Gaming", "History", "Movies", "Music", "Politics", "Programming", "Religion", "Sports", "Science"];
    const interestComponents = interests.map(interest => {
        return <InterestIcon interestName = {interest}/>
    })
  return (
    <div className = "mx-3 d-flex justify-content-between">
        {interestComponents}
    </div>
  )
}

export default InterestCard;