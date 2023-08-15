import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const TYPE_FILTER = "TYPE_FILTER";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export function getPokemons() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/pokemons"); //respuesta del llamado a la api todos los pokemon
    return dispatch({
      type: "GET_POKEMONS", // el tipo varia segun el tipo (get,post)
      payload: response.data, //repuesta del llamado todo los POKEMON
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/pokemons?name=${name}`
      );

      if (response.data.length === 0) {
        return {
          type: "POKEMON_NOT_FOUND",
          payload: [],
        };
      }

      return dispatch({
        type: "GET_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      alert("no existe pokemon con ese nombre", error.message);
      throw error;
    }
  };
}

export function getDetails(id, setIsIdValid) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
      setIsIdValid(true); // La ID es válida, actualizar el estado
    } catch (error) {
      setIsIdValid(false); // La ID no es válida, actualizar el estado
    }
  };
}

export const cleanDetails = () => {
  return { type: CLEAN_DETAILS };
};

export function getTypes(types) {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: response.data,
    });
  };
}
export const filterByOrigin = (selectedOrigin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: selectedOrigin,
  };
};

export const typeFilter = (filter) => {
  return { type: TYPE_FILTER, payload: filter };
};

export const filterPokemon = (filterName) => {
  return { type: FILTER_POKEMON, payload: filterName };
};

export const clearSearch = () => {
  return { type: CLEAR_SEARCH };
};
