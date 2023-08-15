const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getPokemon = async (req, res) => {
  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    try {
      const dbSearchByName = await Pokemon.findAll({
        attributes: ["id", "img", "name"],
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          name: {
            [Op.like]: name,
          },
        },
      });
      //Respuesta de la ruta en caso de encontrar en base de datos
      if (dbSearchByName.length) {
        return res.status(200).json(dbSearchByName[0]);
      }

      ////API
      //Llamado de axios a 'pokeapi.co' con 'name' como endpoint para buscar en API en caso de no encontrar en base de datos
      const response = (
        await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
      ).data;
      //Formateo de la respuesta para que la data coincida con el requerimiento del front
      const apiSearchByName = [
        {
          id: response.id,
          name: response.name,
          img: response.sprites.versions["generation-v"]["black-white"]
            .animated["front_default"],
          types: response.types.map((t) => {
            return { name: t.type.name };
          }),
        },
      ];

      res.status(200).json(apiSearchByName);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const firstResponse = (
        await axios("https://pokeapi.co/api/v2/pokemon?limit=151")
      ).data.results;

      const urls = firstResponse.map((p) => p.url);

      const promises = urls.map((url) => axios(url));

      const allRespones = await Promise.all(promises);

      const apiPokemons = allRespones.map((r) => {
        return {
          id: r.data.id,
          name: r.data.name,
          img: r.data.sprites.versions["generation-v"]["black-white"].animated[
            "front_default"
          ],
          attack: r.data.stats.find((s) => s.stat.name === "attack").base_stat,
          defensa: r.data.stats.find((s) => s.stat.name === "defense")
            .base_stat,
          types: r.data.types.map((t) => {
            return { name: t.type.name };
          }),
        };
      });

      const dbPokemons = await Pokemon.findAll({
        attributes: ["id", "name", "img", "attack"],
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

      const allPokemons = [...dbPokemons, ...apiPokemons];

      res.status(200).json(allPokemons);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};
module.exports = { getPokemon };
