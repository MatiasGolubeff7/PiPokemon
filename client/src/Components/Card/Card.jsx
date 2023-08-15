import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Card({ id, name, img, types }) {
  return (
    <Link to={`/details/${id}`}>
      <div className={style.cardContainer}>
        <div>
          <img className={style.imgcard} src={img} alt="imagenpoke" />
        </div>
        <div className={style.info}>
          <h2>{name.toUpperCase()}</h2>

          <h2>
            {types
              ?.map((t) => {
                return t.name;
              })
              .join(" & ")}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default Card;
