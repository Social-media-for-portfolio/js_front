import React from "react";

const ToggleMutual = ({ toggleMutual, setToggleMutual }) => {
  const handleToggle = (e) => {
    setToggleMutual(e.target.id);
  };

  return (
    <div className="d-flex justify-content-around mx-2 my-2">
      <div className="d-flex flex-column">
        <h5 className="toggle-option" onClick={handleToggle} id="all-friends">
          All friends
        </h5>
        {toggleMutual === "all-friends" && <div className="toggle-line"></div>}
      </div>
      <div className="d-flex flex-column">
        <h5
          className="toggle-option"
          onClick={handleToggle}
          id="mutual-friends"
        >
          Mutual Friends
        </h5>
        {toggleMutual === "mutual-friends" && (
          <div className="toggle-line"></div>
        )}
      </div>
    </div>
  );
};

export default ToggleMutual;
