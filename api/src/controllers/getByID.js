//Controllers are the only ones allowed to interact with our DB.
const {Videogame, Genre} = require("../db") //<-- This is the model from the Database for videogame and for genre
const {api_key} = process.env
const axios = require ("axios");


// 📍 GET | /videogames/:idVideogame
// Obtains detailed view for a specific videogame ID
//  Retrieves the information requested as detail in an object.
        // -  ID.               ✔️ ✔️ 
        // -  Name.             ✔️ ✔️
        // -  Image.            ✔️ ✔️
        // -  Platforms.        ✔️ ✔️
        // -  Description.      ✔️ ✔️
        // -  Release Date.     ✔️ ✔️
        // -  Rating.           ✔️ ✔️
        // -  Géneros.          ✔️  
// Videogame ID is received by params (ID). ✔️
// Must include the information of the associated Genres.
// Must work for both API and DB elements.

//Function to get all videogames:
const getByID = async (id) => {
    // if UUID do sth else do second block
    //Validate that ID is a UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id)) {
        //Searches the ID on the API when it is not an UUID, if no data is retrieved, throws error saying it wasn't found on the API
            try {
                const apiResults = await axios(`https://api.rawg.io/api/games/${id}?key=${api_key}`)
                const {name, background_image, description, released, rating, genres} = apiResults.data
                console.log(apiResults.data);    
                
                return {
                    id,
                    name,
                    background_image,
                    platforms: apiResults.data.platforms.map((p) => p.platform.name),
                    description,
                    released,
                    rating,
                    genres,
                }
                
            } catch (error) {
                throw Error (`Videogame ${id} was not found`) 
            }

    //If it is a UUID, it searches the game on the database. If it is not found, retrieves an error saying the ID is not in the DB.
} else {
    const dbresults = await Videogame.findByPk(id,
        {include:{
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }})
        try {
            const {name, image, platforms, description, released, rating, genres} = dbresults
            return {
                id,
                name,
                background_image:image,
                platforms,
                description,
                released,
                rating,
                genres,
            } 
            
        } catch (error) {
            throw Error (`Videogame ${id} was not found`); 
            
        }
    }

}

module.exports={
    getByID,
}