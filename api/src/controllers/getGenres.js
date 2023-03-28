//Controllers are the only ones allowed to interact with our DB.
const axios = require ("axios");
const {Genre} = require("../db") //<-- This is the model from the Database for videogame and for genre
const {api_key} = process.env

//Function to get all videogames from DB and from API✔️
const getAllGenres = async () => {
    //apidata returns a promise
    const apiGenre = await axios.get (`https://api.rawg.io/api/genres?key=${api_key}`)
    const genres =  apiGenre.data.results.map(({id, name, games})=>(
        {id:id,
        name:name,
        games: games,
        }
    ))
    //Push the information into the database.
    await Genre.bulkCreate(genres,{ignoreDuplicates: true})
    return genres;


}

module.exports={
getAllGenres,
}