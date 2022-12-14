import React from "react";
import logo from "../../assets/network.jpg";
import "./welcome-card.css";
const WelcomeCard = ({ firstName }) => {
  return (
    <div className="d-flex flex-column card-wrapper align-items-center">
      <img src={logo} className="w-50" alt="logo" />
      <h2>{`Welcome to Connect, ${firstName}`}</h2>
      <p className="onboarding-p my-3">
        You can select interests from the list below. This will help us to serve
        you with content that is more likely to be interesting for you
      </p>
    </div>
  );
};

export default WelcomeCard;
