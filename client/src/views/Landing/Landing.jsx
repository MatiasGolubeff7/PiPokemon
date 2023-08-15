import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import React from "react";
import gifBackground from "../../assets/Landing/Landing.gif";

const LandingPage = () => {
  return (
    <div
      className={style.containLanding}
      style={{ backgroundImage: `url(${gifBackground})` }}
    >
      <Link to="/home" className={style.homeButton}>
        START
      </Link>
    </div>
  );
};

export default LandingPage;
