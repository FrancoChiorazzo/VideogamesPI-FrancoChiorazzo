//Controllers are the only ones allowed to interact with our DB.
const axios = require ("axios");
const {Videogame, Genre} = require("../db"); //<-- This is the model from the Database for videogame and for genre
const {api_key} = process.env

//Function to get all videogames from DB and from API✔️
const getAllGames = async (origin,genreFilter,sort,page,pageSize) => {
    let apiGames = [];
    let pageNum = 1;

    //apidata returns a promise
    while (apiGames.length < 100 && pageNum <= 10) {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=${pageNum}`);
        apiGames.push(...data.results.map(element => ({
            id: element.id,
            name: element.name,
            background_image: element.background_image,
            genres: element.genres.map(genre => genre),
            platforms: element.platforms.map(element => element.platform.name),
            // description: element.description,
            // released: element.released,
            rating: element.rating,            
        })));
        pageNum++;
    }

    //Another method for the model is find all to retrieve all records from a Database. This is also a promise, so it requires the handler to be async and the await for the method.
    let dbGames = await Videogame.findAll({
            include:{
                model: Genre,
                attributes: ["name", "id"],
                through: {
                    attributes: [],
                }
            }
        })
    //Maps the results from the DB to show only the requested fields 
        dbGames = dbGames.map(element => {
            return{
                id:element.id,
                name:element.name,
                background_image:element.image,
                platforms:element.platforms,
                rating:element.rating,
                genres: element.genres.map(element => element),
            }           
        });

    let finalArray =[...dbGames, ...apiGames]
        console.log(apiGames.length, "APIGAMES count");
        //Filter by Origin of data ✔️
        if (origin === "DB") {
            finalArray = dbGames;
            // return finalArray
        }
        if (origin === "API") {
            finalArray = apiGames;
            // return finalArray
        }
        //Filter by Genre✔️
            if (genreFilter){
                genreFilter = genreFilter.split(",") // [ 'Simulation', 'Adventure', 'Sports' ] FILTRO DE GENEROS
                finalArray =  finalArray.filter(game => {
                    return game.genres.some(genre => genreFilter.includes(genre.name));
                  });
            }
      
    if (finalArray.length===0)  throw Error (`No videogame with current parameters has been found`)
    
//----------------------------Sorts by Name---------------------------------
if (sort === "A-Z") {
    finalArray = finalArray.sort((a, b) => a.name.localeCompare(b.name));
} else if (sort === "Z-A") {
    console.log("previous", finalArray.map((e)=>{return (e.name)}));
    finalArray = finalArray.sort((a, b) => b.name.localeCompare(a.name));
    console.log("later", finalArray.map((e)=>{return (e.name)}));
}

//----------------------------Sorts by Rating---------------------------------
if (sort === "1-5") {
finalArray = finalArray.sort((a, b) => a.rating-b.rating);
} else if (sort === "5-1") {
console.log("previous", finalArray.map((e)=>{return (e.rating)}));
finalArray = finalArray.sort((a, b) => b.rating-a.rating);
console.log("later", finalArray.map((e)=>{return (e.rating)}));
}

console.log("page", page);
//----------------------------------PAGES----------------------------------------

const startIndex = (page - 1 )* pageSize
const endIndex = startIndex + pageSize;
const gamesDisplayed= finalArray.slice(startIndex,endIndex)

const totalPages = Math.ceil(finalArray.length/pageSize)
const currentPage = parseInt(page)

return { 
    games: gamesDisplayed, totalPages,currentPage
}
    // return finalArray;
    
}

module.exports={
    getAllGames,
}