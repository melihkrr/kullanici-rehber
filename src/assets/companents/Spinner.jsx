import React from "react";
import spin from "../images/spin.gif";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spin} alt="" className="d-block" style={{ width: "100px" }} />
    </div>
  );
};

export default Spinner;
