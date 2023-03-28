const {Router} = require("express");
const {getAllGenres} = require("../controllers/getGenres");


// VIDEOGAMES ROUTES 


// 📍 GET | /genres

// GET /videogames/genre

// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

const genres = Router();

genres.get("/", async (req,res)=>{
    try {
        const genres = await getAllGenres();
        res.status(200).json({genres});
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

module.exports=genres;