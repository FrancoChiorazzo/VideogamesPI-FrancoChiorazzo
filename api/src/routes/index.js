const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./allGames.js")
const gameByID = require("./gameByID.js")
const genres = require("./genres.js")


const router = Router();

// Configurar los routers
router.use("/", videoGamesRouter);
router.use("/:id", gameByID );
router.use("/genres", genres );


// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
