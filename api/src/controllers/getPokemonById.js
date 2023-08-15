const { Pokemon, Type } = require("../db");
const axios = require("axios");
const isUUID = require("../utils/idUUID");

const getPokemonById = async (req, res) => {
  const { id } = req.params;

  try {
    if (isUUID(id)) {
      const dbPokemonById = await Pokemon.findByPk(id, {
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!dbPokemonById) {
        res.status(404).json({ error: "Pokemon not found!" });
      } else {
        res.status(200).json(dbPokemonById);
      }
    } else {
      const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const apiPokemonById = {
        id: response.data.id,
        name: response.data.name,
        img: response.data.sprites.versions["generation-v"]["black-white"]
          .animated["front_default"],
        types: response.data.types.map((t) => {
          return { name: t.type.name };
        }),
        health: response.data.stats.find((s) => s.stat.name === "hp").base_stat,
        attack: response.data.stats.find((s) => s.stat.name === "attack")
          .base_stat,
        defense: response.data.stats.find((s) => s.stat.name === "defense")
          .base_stat,
        speed: response.data.stats.find((s) => s.stat.name === "speed")
          .base_stat,
        height: response.data.height,
        weight: response.data.weight,
      };

      res.status(200).json(apiPokemonById);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getPokemonById };
