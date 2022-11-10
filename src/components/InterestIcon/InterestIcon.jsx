import React from 'react'
import "./interest-icon.css"

const InterestIcon = ({interestName}) => {
  return (
    <div className = "border rounded-pill interest d-flex justify-content-center align-items-center">
        <h6 className = "py-2 my-2 px-2">{interestName}</h6>
    </div>
  )
}

export default InterestIcon