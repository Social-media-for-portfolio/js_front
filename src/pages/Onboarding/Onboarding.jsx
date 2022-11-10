import React from "react";
import Navbar from "../../sections/Navbar/Navbar";
import Footer from "../../sections/Footer/Footer";
import WelcomeCard from "../../components/WelcomeCard";
import InterestCard from "../../components/InterestCard";
import "./onboarding.css";

const Onboarding = () => {
  return (
    <div className="contariner-fluid mx-0 px-0">
      <Navbar />
      <div className="d-flex flex-column align-items-center">
        <div className = "d-flex justify-content-center">
        <div className = "w-75 my-4">
        <WelcomeCard />
        </div>
        </div>
      </div>
      <div className = "my-4 mx-3 d-flex flex-column">
            <InterestCard/>
            <button className = "btn continue-btn align-self-center my-4">Continue</button>
        </div>
      <Footer />
    </div>
  );
};

export default Onboarding;
