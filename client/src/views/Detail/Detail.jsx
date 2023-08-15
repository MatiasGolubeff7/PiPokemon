import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import { getDetails, cleanDetails } from "../../redux/actions";
import style from "./Detail.module.css";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const { id } = useParams();
  const [isIdValid, setIsIdValid] = useState(true);

  useEffect(() => {
    dispatch(getDetails(id, setIsIdValid));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(cleanDetails());
    };
  }, [dispatch]);

  if (!isIdValid) {
    return (
      <div>
        <h1>No existe un personaje con esa ID</h1>
      </div>
    );
  }

  if (details.id) {
    return (
      <div>
        <NavBar />

        <div className={style.detailsPage}>
          <div className={style.card}>
            <section className={style.leftSection}>
              <div className={style.cardInfo}>
                <img
                  src={details.img}
                  alt={`${details.name} sprite`}
                  className={style.cardImage}
                />
                <h1>{details.name?.toUpperCase()}</h1>
                <p>
                  {details?.types
                    ?.map((t) => t.name)
                    .join(" & ")
                    .toUpperCase()}
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>❤️ Vida: {details.health}</p>
                <p>⚔️ Ataque: {details.attack}</p>
                <p>🛡️ Defensa: {details.defense}</p>
                <p>⚡ Velocidad: {details.speed}</p>
                <p>📏 Altura: {details.height}</p>
                <p>⚖️ Peso: {details.weight}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default DetailsPage;
