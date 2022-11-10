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
  const [interestsSelected, setInterestsSelected] = useState(0);
  const [error, setError] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const handleClick = () => {
    if (interestsSelected < 3) {
      setError(true);
      return;
    } else {
      setNavigate(true);
    }
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
        <InterestCard
          setError={setError}
          interestsSelected={interestsSelected}
          setInterestsSelected={setInterestsSelected}
        />
        <button
          onClick={handleClick}
          className="btn continue-btn align-self-center my-4"
        >
          Continue
        </button>

        {error && (
          <p className="error align-self-center">
            You have to select at least 3 interests.
          </p>
        )}
        {navigate && <Navigate to="/home" />}
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;
