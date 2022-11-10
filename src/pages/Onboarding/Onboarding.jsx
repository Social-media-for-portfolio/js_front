import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../sections/Navbar/Navbar";
import Footer from "../../sections/Footer/Footer";
import WelcomeCard from "../../components/WelcomeCard";
import InterestCard from "../../components/InterestCard";
import { getMyUserInfo } from "../../utils/api";
import "./onboarding.css";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleClick = () => {
    setNavigate(true);
    return;
  };

  const getUserInfo = async () => {
    const { first_name } = await getMyUserInfo();
    setName(first_name);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="contariner-fluid mx-0 px-0">
      <Navbar />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center">
          <div className="w-75 my-4">
            <WelcomeCard firstName={name} />
          </div>
        </div>
      </div>
      <div className="my-4 mx-3 d-flex flex-column">
        <InterestCard/>
        <button
          onClick={handleClick}
          className="btn continue-btn align-self-center my-4"
        >
          Continue
        </button>
        {navigate && <Navigate to="/home" />}
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;
