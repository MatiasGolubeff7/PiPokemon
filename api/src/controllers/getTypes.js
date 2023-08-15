const { Type } = require("../db");

const getTypes = async (req, res) => {
  try {
    const allTypes = await Type.findAll();

    res.status(200).json(allTypes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getTypes };

// const axios = require("axios");
// const { Type } = require("../db");
// const URL = "https://pokeapi.co/api/v2/type";

// const getTypes = async (req, res) => {
//   try {
//     //Agrego los tipos a la BD.
//     const response = await axios.get(URL);

//     //Obtengo los tipos guardados en la BD
//     const types = await Type.findAll({ attributes: ["name"] });

//     if (types.length > 0) {
//       //Si los tipos ya existen en la BD, retornarlos.
//       return res.status(200).json(types);
//     }

//     //Obtengo todos los tipos de pokemones
//     const typesPoke = response.data.results.map((type) => ({
//       name: type.name,
//     }));

//     //Guardarlos en la BD
//     await Type.bulkCreate(typesPoke);

//     //Devolver la respusta
//     return res.status(200).json(typesPoke);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = { getTypes };

// const { Type } = require("../db");
// const axios = require("axios");

// module.exports = async (req, res) => {
//   try {
//     const response = (await axios("https://pokeapi.co/api/v2/type")).data
//       .results;
//     await Type.bulkCreate(response);

//     const allTypes = await Type.findAll();
//     res.status(200).json(allTypes);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
