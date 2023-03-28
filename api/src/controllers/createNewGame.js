// 📍 POST | /videogames
    // Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
    // Toda la información debe ser recibida por body.
    // Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).

// const { videogames } = require("../data"); //<--Array to test the model
const {Videogame, Genre} = require("../db") //<-- This is the model from the Database for videogame and for genre

    // Nombre.✔️
    // Imagen.✔️
    // Descripción.✔️
    // Plataformas.✔️
    // Fecha de lanzamiento.✔️
    // Rating.✔️
    // Posibilidad de seleccionar/agregar varios géneros en simultáneo. ✔️
    // Botón para crear el nuevo videojuego.

    
    const createNewGame = async (name, image, description, platforms, released, rating, genre) => {
        //Models have methods that allow us to create new entries. They require an object with the expected properties.
        //This method returns a promise. Hence, it requires an await for the promise and the function to be async
        //As the result of an async function is also a Promise, I must wait for the Promise to ve solved in the ROUTE
        //Validate that it includes an array of Genres and contains at least one element.
        try {
            //Validates the input provided in the body
            if (!Array.isArray(genre)) throw Error ("Genres must be an array")
            if (genre.length===0) throw Error ("Genres must contain at least one Genre")
            if (!Array.isArray(platforms)) throw Error ("Platforms must be an array")
            if (platforms.length===0) throw Error ("Platforms must contain at least one Platform")
            if (!name) throw Error ("Please complete field 'Name'")
            if (!image) throw Error ("Please complete field 'Image'")
            if (!description) throw Error ("Please complete field 'Description'")
            if (!released) throw Error ("Please complete field 'Release Date'")
            if (!rating) throw Error ("Please complete 'Rating'")

            //Validate that the name does not exist in the Database
            const nameValidation = await Videogame.findAll({
                where: {name:name}
            })
            if (nameValidation.length!==0) throw Error ("Name already exists in the DB")        
            
            //creates the new Game
            const newGame = await Videogame.create({name, image, description, platforms, released, rating }) 
            
            //searches all genres that are included in the request in the DB:
            const genresInDB = await Genre.findAll({
                where: {name:genre}
            })
            //Links the genre(s) in the model to the videogame that is being created and returns the new game that was created.
            await newGame.addGenre(genresInDB)
            
            return newGame
        
        //In case there is an error, it returns the error
        } catch (error) {
            return {error: error.message}
        }
    }

module.exports = {
    createNewGame,
}