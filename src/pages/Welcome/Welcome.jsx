import React from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import friends from "../../assets/friends.jpg";
import interest1 from "../../assets/interest1.jpg"
import interest2 from "../../assets/interest2.jpg";
import interest3 from "../../assets/interest3.jpg";
import profile from "../../assets/user-profile.jpg"
import "./welcome.css";
const Welcome = () => {
  return (
    <div classname="container-fluild mx-0 px-0 d-flex flex-column">
      <Navbar />
      <div className="welcome d-flex flex-column">
        <h1 className="align-self-center">Welcome to Connect!</h1>
        <div className="row">
          <div className="col">
            <div className="welcome-card-wrapper d-flex flex-column align-items-center mx-3 my-3">
              <div className="my-3">
                <img className="friends-img" src={friends} />
              </div>
              <div class="d-flex flex-column align-items-center">
                <div class="card-title">Friends</div>
                <p>
                    Look for people who are interesting to you and make new friends!
                </p>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="welcome-card-wrapper d-flex flex-column align-items-center mx-3 my-3">
              <div className="my-3 d-flex justify-content-between">
                <img className="interest1-img mx-2" src={interest1} />
                <img className="interest3-img mx-2" src={interest3} />
                <img className="interest2-img mx-2 " src={interest2} />
              </div>
              <div class="d-flex flex-column align-items-center">
                <div class="card-title">Interests</div>
                <p>Posts that match your interests will be prioritized in the feed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
          <div className="welcome-card-wrapper d-flex flex-column align-items-center mx-3 my-3">
              <div className="my-3">
                <img className="user-profile-img mx-2" src={profile} />
              </div>
              <div class="d-flex flex-column align-items-center">
                <div class="card-title">User Profile</div>
                <p>View your activity and customize your information in user profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
