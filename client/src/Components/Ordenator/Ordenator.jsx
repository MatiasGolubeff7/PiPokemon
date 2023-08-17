import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPokemon, filterByOrigin } from "../../redux/actions";
import style from "./Ordenator.module.css";

const Ordenator = ({ setPage }) => {
  const searchPoke = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = useState(""); // Estado para almacenar el criterio de ordenamiento

  const handleFilter = (e) => {
    setPage(0);
    dispatch(filterPokemon(e.target.name));
    setOrderBy(e.target.name); // Actualiza el criterio de ordenamiento al hacer clic en el botón
  };

  const handleOriginFilter = (e) => {
    setPage(0);
    dispatch(filterByOrigin(e.target.name));
    setOrderBy(e.target.name); // Actualiza el criterio de ordenamiento al hacer clic en el botón
  };

  // if (orderBy === "uuid") {

  // }

  return (
    <div className={style.ordenatorContainer}>
      <div className={style.buttonGroup}>
        {searchPoke.length > 1 && (
          <>
            <button
              className={`${style.button} ${
                orderBy === "aToZ" ? style.selected : ""
              }`}
              name="aToZ"
              onClick={handleFilter}
            >
              A-Z
            </button>
            <button
              className={`${style.button} ${
                orderBy === "zToA" ? style.selected : ""
              }`}
              name="zToA"
              onClick={handleFilter}
            >
              Z-A
            </button>
          </>
        )}
      </div>

      <div className={style.buttonGroup}>
        {searchPoke.length > 1 && (
          <>
            <button
              className={`${style.button} ${
                orderBy === "attackDesc" ? style.selected : ""
              }`}
              name="attackDesc"
              onClick={handleFilter}
            >
              - ATK
            </button>
            <button
              className={`${style.button} ${
                orderBy === "attackAsc" ? style.selected : ""
              }`}
              name="attackAsc"
              onClick={handleFilter}
            >
              + ATK
            </button>
          </>
        )}
      </div>
      <div className={style.buttonGroup}>
        {searchPoke.length > 1 && (
          <>
            <button
              className={style.button}
              name="uuid"
              onClick={handleOriginFilter}
            >
              CREATED
            </button>
            <button
              className={style.button}
              name="numeric"
              onClick={handleOriginFilter}
            >
              ORIGINALS
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Ordenator;
