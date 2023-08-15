import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = ({ handleClear }) => {
  return (
    <div className={style.container}>
      <div className={style.leftButtons}>
        <Link to={"/home"}>
          <button className={style.button}>HOME</button>
        </Link>
        <Link to={"/about"}>
          <button className={style.button}>ABOUT</button>
        </Link>
      </div>
      <div className={style.rightButtons}>
        <button onClick={handleClear} className={style.clearButton}>
          CLEAR
        </button>
        <Link to={"/createPoke"}>
          <button className={style.createButton}>+ CREATE POKEMON</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
