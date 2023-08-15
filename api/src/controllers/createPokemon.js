// const { Pokemon, Type } = require("../db");
// const createPokemon = async (req, res) => {
//   try {
//     // Destructuración de los datos que vienen por el Body
//     const { name, img, health, attack, defense, speed, height, weight, types } =
//       req.body;

//     // Comprobación de datos faltantes
//     if (
//       !name ||
//       !img ||
//       !health ||
//       !attack ||
//       !defense ||
//       !speed ||
//       !height ||
//       !weight ||
//       !types
//     ) {
//       return res.status(401).send("Faltan datos");
//     }

//     // Buscar o crear los tipos en la base de datos
//     const pokeTypes = [];
//     for (const typeName of types) {
//       let type = await Type.findOne({ where: { name: typeName } });
//       if (!type) {
//         // Si el tipo no existe, lo creamos en la base de datos
//         type = await Type.create({ name: typeName });
//       }
//       pokeTypes.push(type);
//     }

//     // Buscar el Pokémon en la base de datos
//     const existePoke = await Pokemon.findOne({ where: { name } });

//     // Si existe, enviar un mensaje
//     if (existePoke) {
//       return res.json({ info: "Este pokemon ya existe!" });
//     }

//     // Crear un nuevo pokemon en la base de datos
//     const nuevoPokemon = await Pokemon.create({
//       name,
//       img,
//       health,
//       attack,
//       defense,
//       speed,
//       height,
//       weight,
//     });

//     // Asociar los tipos al nuevo Pokémon
//     await nuevoPokemon.addTypes(pokeTypes);

//     return res
//       .status(201)
//       .json({ message: "Pokemon successfully created", nuevoPokemon });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = { createPokemon };
const { Pokemon } = require("../db");

const createPokemon = async (req, res) => {
  try {
    const { name, health, speed, defense, attack, height, weight, types, img } =
      req.body;
    const newPokemon = await Pokemon.create({
      name,
      health,
      speed,
      defense,
      attack,
      height,
      weight,
      img,
    });

    await newPokemon.addTypes(types);

    res.status(201).json({
      message: "Pokemon successfully created",
      new_pokemon: newPokemon,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPokemon };
