const { Router } = require("express");

const router = Router();
const { getPokemon } = require("../controllers/getPokemonsName");
const { createPokemon } = require("../controllers/createPokemon");
const { getPokemonById } = require("../controllers/getPokemonById");

router.post("/", createPokemon);
router.get("/", getPokemon);
router.get("/:id", getPokemonById);

module.exports = router;
