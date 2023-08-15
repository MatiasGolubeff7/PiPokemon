import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ allPokemons }) => {
  return (
    <div className={style.cardsContainer}>
      <div className={style.pokeCards}>
        {allPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            img={pokemon.img}
            name={pokemon.name}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
};
export default Cards;
