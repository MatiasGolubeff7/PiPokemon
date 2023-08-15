const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const rtPokemons = require("./routesPok");
const rtTypes = require("./routeTypes");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", rtPokemons);
router.use("/types", rtTypes);
module.exports = router;
