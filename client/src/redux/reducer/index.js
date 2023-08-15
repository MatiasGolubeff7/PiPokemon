import {
  GET_BY_NAME,
  GET_POKEMONS,
  GET_DETAILS,
  CLEAN_DETAILS,
  GET_TYPES,
  TYPE_FILTER,
  FILTER_POKEMON,
  CLEAR_SEARCH,
  FILTER_BY_ORIGIN,
} from "../actions";

let initialState = {
  allPokemons: [],
  pokemonCopy: [],
  posts: [],
  details: {},
  types: [],
  filter: "all",
  pokemonOrder: [],
  originFilter: "all",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemonCopy: action.payload,
        pokemonOrder: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAN_DETAILS:
      return { ...state, details: {} };

    case GET_TYPES:
      return { ...state, types: action.payload.slice(0, 20) };

    case TYPE_FILTER:
      if (action.payload === "all") {
        return {
          ...state,
          allPokemons: state.pokemonCopy, //pokemonCopy
          filter: action.payload,
        };
      } else {
        return {
          ...state,
          filter: action.payload,
          allPokemons: state.pokemonCopy.filter((p) => {
            return p.types.filter((t) => t.name === action.payload).length;
          }),
        };
      }

    case FILTER_POKEMON:
      if (action.payload === "aToZ") {
        return {
          ...state,
          pokemonCopy: state.pokemonCopy
            // .filter((pokemon) =>
            //   state.allPokemons.find((p) => p.name === pokemon.name)
            // ) // Filtrar por tipo
            .sort((a, b) => a.name.localeCompare(b.name)), // Ordenar alfabéticamente
        };
      }
      if (action.payload === "zToA") {
        return {
          ...state,
          pokemonCopy: state.pokemonCopy
            .sort((a, b) => a.name.localeCompare(b.name))
            .reverse(),
        };
      }
      if (action.payload === "attackDesc") {
        return {
          ...state,
          pokemonCopy: state.pokemonCopy.sort((a, b) => a.attack - b.attack),
        };
      }
      if (action.payload === "attackAsc") {
        return {
          ...state,
          pokemonCopy: state.pokemonCopy.sort((a, b) => b.attack - a.attack),
        };
      }

    case CLEAR_SEARCH:
      return {
        ...state,
        allPokemons: state.pokemonOrder,
      };

    case FILTER_BY_ORIGIN:
      const selectedOrigin = action.payload;
      let filterPokemons = [];

      if (selectedOrigin === "all") {
        filterPokemons = state.pokemonCopy;
      } else {
        const isNumericOrigin = selectedOrigin === "numeric";
        filterPokemons = state.pokemonCopy.filter((p) => {
          const isNumericId = typeof p.id === "number";
          return isNumericOrigin === isNumericId;
        });
      }

      return {
        ...state,
        originFilter: selectedOrigin,
        allPokemons: filterPokemons,
      };

    default:
      return state;
  }
}

export default rootReducer;
