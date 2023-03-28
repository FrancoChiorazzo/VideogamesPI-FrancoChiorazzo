const {Router} = require("express");
const { getByID } = require("../controllers/getByID");

// VIDEOGAMES ROUTES 


// GET /videogames/:idVideogame
const gameByID = Router();

gameByID.get("/:id", async(req,res)=>{
    const {id} =req.params
    let GameDetail;
    //Try-catch is set in order to identify the case where there is no such name on the database and return error 400:
    try {
        GameDetail = await getByID(id)        
        res.status(200).json(GameDetail)

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}) 





module.exports=gameByID;