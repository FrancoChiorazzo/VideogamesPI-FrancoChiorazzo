//Controllers are the only ones allowed to interact with our DB.
const {Videogame, Genre} = require("../db");
const {Op} = require ("sequelize")
const axios = require ("axios");
const { parse } = require("dotenv");
const {api_key} = process.env

// Retrieve first 15 videogames found with the word given by query. ✔️
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.✔️
// Si no existe el videojuego, debe mostrar un mensaje adecuado.✔️
// Debe buscar tanto los de la API como los de la base de datos.✔️
//Function to get all videogames:
const getByName = async(name, origin, genreFilter, sort, page,pageSize) => {
    let apiGames = [];
    let pageNum = 1;

    //apidata returns a promise
    while (apiGames.length < 100 && pageNum <= 10) {
        console.log(api_key, "apikey");
    const {data} = await axios.get (`https://api.rawg.io/api/games?key=${api_key}&search=${name}`)
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

    
    // const apiGames = data.results
    let dbGames = await Videogame.findAll({
        where: {name:{
            [Op.iLike]: `%${name}%`
        }},
        include:{
            model: Genre,
            attributes: ["name", "id"],
            through: {
                attributes: [],
            }
        }})
    
    //Maps the results from the DB to show only the requested fields 
    dbGames = dbGames.map(element => {
        return{
            id:element.id,
            name:element.name,
            background_image:element.image,
            platforms: element.platforms,
            description:element.description,
            released: element.released,
            rating: element.rating,
            genres: element.genres.map(element => element),
        }           
    });

    let finalArray = [ ...dbGames, ...apiGames]
    
    //Filter by Origin of Data ✔️
    if (origin === "DB") {
        finalArray = dbGames;
        // return finalArray
    }
    if (origin === "API") {
        finalArray = apiGames;
        // return finalArray
    }
    //Filter by Genre ✔️
        if (genreFilter){
            genreFilter = genreFilter.split(",") // [ 'Simulation', 'Adventure', 'Sports' ] FILTRO DE GENEROS
            finalArray =  finalArray.filter(game => {
                return game.genres.some(genre => genreFilter.includes(genre.name));
              });
        }     
    if (finalArray.length===0)  throw Error (`Videogame ${name} was not found`)


//----------------------------Sorts by Name---------------------------------
    if (sort === "A-Z") {
        console.log("previous", finalArray.map((e)=>{return (e.name)}));

        finalArray = finalArray.sort((a, b) => a.name.localeCompare(b.name));
        console.log("later", finalArray.map((e)=>{return (e.name)}));

    } else if (sort === "Z-A") {
        finalArray = finalArray.sort((a, b) => b.name.localeCompare(a.name));
    }

//----------------------------Sorts by Rating---------------------------------
if (sort === "1-5") {
    // console.log("previous", finalArray.map((e)=>{return (e.rating)}));

    finalArray = finalArray.sort((a, b) => a.rating-b.rating);
    // console.log("later", finalArray.map((e)=>{return (e.rating)}));

} else if (sort === "5-1") {
    finalArray = finalArray.sort((a, b) => b.rating-a.rating);
}

if (name.trim().length > 0) {finalArray=finalArray.slice(0,15);}

//----------------------------------PAGES----------------------------------------
console.log("page:", page, "pageSize:", pageSize);
const startIndex = (page - 1 )* pageSize
const endIndex = startIndex + pageSize;
const gamesDisplayed= finalArray.slice(startIndex,endIndex)
console.log("total Games",finalArray.length,"Start:",startIndex,"end:", endIndex,"Length:", gamesDisplayed.length);

const totalPages = Math.ceil(finalArray.length/pageSize)
const currentPage = parseInt(page)

return { 
    games: gamesDisplayed, totalPages,currentPage
}
//Returns first 15 elements retrieved. Takes first all the elements in the DB and then the rest from the API
// return finalArray.slice(0,15);
}



module.exports={
    getByName,
}