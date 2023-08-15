import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, getByName, getPokemons } from "../../redux/actions";
import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import TypesFilter from "../../Components/TypesFilter/TypesFilter";
import Ordenator from "../../Components/Ordenator/Ordenator";
import Pagination from "../../Components/Paginado/Pagination";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const ppp = 12;
  const [page, setPage] = useState(0);

  const allPokemons = useSelector((state) => {
    const pokemons = state.allPokemons;
    if (Array.isArray(pokemons)) {
      return pokemons.slice(page * ppp, page * ppp + ppp);
    }
    return [pokemons];
  });

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPage(0);

    try {
      const response = await dispatch(getByName(searchString));
      if (!response) {
        console.log(
          `No se encontró ningún Pokémon con el nombre "${searchString}"`
        );
      }
      setSearchString("");
    } catch (error) {
      console.log("Ocurrió un error al buscar el Pokémon:", error.message);
    }
  }

  function handlePage(page) {
    setPage(page);
  }

  const handleClear = () => {
    setPage(0);
    dispatch(clearSearch());
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={style.homeContainer}>
      <NavBar handleClear={handleClear}></NavBar>
      <div className={style.searchContainer}>
        <form onSubmit={handleSubmit} className={style.searchForm}>
          <input
            className={style.searchInput}
            placeholder="Busqueda"
            type="search"
            value={searchString}
            onChange={handleChange}
          />
          <button className={style.searchButton} type="submit">
            SEARCH
          </button>
        </form>
      </div>
      <TypesFilter setPage={setPage} />
      <Ordenator setPage={setPage} />
      <Pagination handlePage={handlePage} page={page} ppp={ppp} />
      <Cards allPokemons={allPokemons} />
    </div>
  );
};

export default Home;
