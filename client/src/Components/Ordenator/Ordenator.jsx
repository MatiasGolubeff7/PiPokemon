// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { filterPokemon, filterByOrigin } from "../../redux/actions";
// import style from "./Ordenator.module.css";
// const Ordenator = ({ setPage }) => {
//   const searchPoke = useSelector((state) => state.allPokemons);
//   const dispatch = useDispatch();
//   const handleFilter = (e) => {
//     setPage(0);
//     dispatch(filterPokemon(e.target.name));
//   };

//   const handleOriginFilter = (e) => {
//     setPage(0);
//     dispatch(filterByOrigin(e.target.name));
//   };

//   return (
//     <div className={style.ordenatorContainer}>
//       <h2 className={style.ordenatorTitle}>Ordenar Por</h2>
//       <div className={style.ordenatorButtons}>
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="aToZ"
//             onClick={handleFilter}
//           >
//             &#10607; A-Z
//           </button>
//         )}
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="zToA"
//             onClick={handleFilter}
//           >
//             &#10607; Z-A
//           </button>
//         )}
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="attackDesc"
//             onClick={handleFilter}
//           >
//             - ATTACK
//           </button>
//         )}
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="attackAsc"
//             onClick={handleFilter}
//           >
//             + ATTACK
//           </button>
//         )}
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="numeric"
//             onClick={handleOriginFilter}
//           >
//             ORIGINAL POKEMONS
//           </button>
//         )}
//         {searchPoke.length > 1 && (
//           <button
//             className={style.ordenatorButton}
//             name="uuid"
//             onClick={handleOriginFilter}
//           >
//             POKEMONS CREATED
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ordenator;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPokemon, filterByOrigin } from "../../redux/actions";
import style from "./Ordenator.module.css";

const Ordenator = ({ setPage }) => {
  const searchPoke = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    setPage(0);
    dispatch(filterPokemon(e.target.name));
  };

  const handleOriginFilter = (e) => {
    setPage(0);
    dispatch(filterByOrigin(e.target.name));
  };

  return (
    <div className={style.ordenatorContainer}>
      <div className={style.buttonGroup}>
        {searchPoke.length > 1 && (
          <>
            <button className={style.button} name="aToZ" onClick={handleFilter}>
              A-Z
            </button>
            <button className={style.button} name="zToA" onClick={handleFilter}>
              Z-A
            </button>
          </>
        )}
      </div>
      <div className={style.buttonGroup}>
        {searchPoke.length > 1 && (
          <>
            <button
              className={style.button}
              name="attackDesc"
              onClick={handleFilter}
            >
              - ATK
            </button>
            <button
              className={style.button}
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
              Creados
            </button>
            <button
              className={style.button}
              name="numeric"
              onClick={handleOriginFilter}
            >
              Originales
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Ordenator;
