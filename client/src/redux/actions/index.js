import { GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BYID, GET_VIDEOGAMES_BYNAME, RESET_STATE, HANDLE_ERROR } from "../action-types/action-types";
import axios from "axios";

export const getVideogames = () => {
    return async function(dispatch){
        let response = await axios(`http://localhost:3001/videogames`)
        return dispatch ({
            type: GET_VIDEOGAMES,
            payload: response.data
        })
    }
}

export const getVideogamesByName = (name, origin, genreFilter, sort, page) => {
    return async function(dispatch){
        try {
            let response =  await axios(`http://localhost:3001/videogames?name=${name||""}&origin=${origin||""}&genreFilter=${genreFilter||""}&sort=${sort||""}&page=${page}`)
            console.log("GET","name",name, "origin",origin,"Genre",genreFilter,`http://localhost:3001/videogames?name=${name||""}&origin=${origin||""}&genreFilter=${genreFilter||""}&sort=${sort||""}&page=${page}`);
    
            return dispatch ({
                type: GET_VIDEOGAMES_BYNAME,
                payload: response.data
            })
        } catch (error) {
            return dispatch ({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }
      
    }
}

export const getVideogamesById = (id) => {
    return async function(dispatch){
        let response = await axios(`http://localhost:3001/videogames/${id}`)

        return dispatch ({
            type: GET_VIDEOGAMES_BYID,
            payload: response.data
        })
    }
}
export const resetVideogamesDetail = () => ({
            type: RESET_STATE,
            
        })

export const getGenres = () => {
    return async function(dispatch){
        let response = await axios(`http://localhost:3001/genres`)

        return dispatch ({
            type: GET_GENRES,
            payload: response.data
        })
    }
}

export const addGame = (newGame) => {
    try {
        return async function (dispatch){
            const response = await axios.post(`http://localhost:3001/videogames`,newGame)
            return response
        }
    } catch (error) {
        console.log(error)
    }
}