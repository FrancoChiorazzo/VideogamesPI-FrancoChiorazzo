const {Router} = require("express");
const { getByName } = require("../controllers/gameByName");
const {getAllGames} = require("../controllers/getAllGames");
const {createNewGame} = require ("../controllers/createNewGame");


// VIDEOGAMES ROUTES 

// GET /videogames => Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
// GET videogames/name?="..."

const allGames = Router();

allGames.get("/videogames", async (req,res)=>{
    const {name,origin,genreFilter,sort} =req.query
    const page = req.query.page ||1
    const pageSize = req.query.pageSize || 15
    // let listOfGames;
//Try-catch is set in order to identify the case where there is no such name on the database and return error 400:
try {
    if (name) {
        listOfGames = await getByName(name, origin,genreFilter,sort,page,pageSize)
    } else {
        //Calls a function that is in the controllers section and interacts with DB. As the controller is async, the function must wait for the result and make the handler async
        listOfGames = await getAllGames(origin,genreFilter,sort,page,pageSize)
    } 
    res.status(200).json(listOfGames) 
} catch (error) {
    res.status(400).json({error: error.message}) 
}

})

// POST /videogames ==> CREAR VIDEOJUEGO NUEVO
//this must be a promise because the function that creates a new game returns a promise, so the code must wait for the Promise to be solved. (Handler asynch and await the function)
allGames.post("/videogames",async (req,res)=>{
    const {name, image, description, platforms, released, rating, genre} = req.body
    const newGame = await createNewGame(name, image, description, platforms, released, rating, genre)
try {
    res.status(200).json(newGame)
} catch (error) {
    res.status(400).json({error: error.message})
    
}
})



module.exports=allGames;