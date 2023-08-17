// About.jsx

import React from "react";
import style from "./About.module.css";
import NavBar from "../../Components/NavBar/NavBar";

const About = () => {
  return (
    <div className={style.background}>
      <div className={style.overlay}></div>
      <div>
        <NavBar />
      </div>
      <div className={style.container}>
        <div className={style.img}></div>
        <div className={style.card}>
          <h1 className={style.h1}>MATIAS GOLUBEFF</h1>
          <h2 className={style.h2}>Frontend Developer</h2>
          <p className={style.p}>
            Passionate about learning and personal growth. Always seeking new
            challenges and opportunities to develop myself. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nulla pellentesque quam id
            velit hendrerit, at pharetra quam pellentesque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
