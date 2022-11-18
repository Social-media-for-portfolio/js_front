import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import InterestCard from "../../components/InterestCard";
import WelcomeCard from "../../components/WelcomeCard";
import Footer from "../../sections/Footer/Footer";
import Navbar from "../../sections/Navbar/Navbar";
import {
  addInterests,
  checkOnboarding,
  getMyUserInfo,
  setOnboarding,
} from "../../utils/api";
import "./onboarding.css";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [interests, setInterests] = useState([]);

  const handleClick = () => {
    sendInterests();
    setNavigate(true);
    return;
  };
  const sendInterests = async () => {
    await addInterests(interests);
    await setOnboarding();
  };

  const getUserInfo = async () => {
    const { onboarding } = await checkOnboarding();
    if (!onboarding) {
      setNavigate(true);
    }
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
        <InterestCard interests={interests} setInterests={setInterests} />
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
