import { ADD_GAME, GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BYID, GET_VIDEOGAMES_BYNAME, HANDLE_ERROR, RESET_STATE } from "../action-types/action-types";
const initialState = {
    videogames: [],
    genres: [],
    videogamesDetail: {},
    games: [],
    errorMessage:""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
            }
        case GET_VIDEOGAMES_BYNAME:
            return {
                ...state,
                videogames: action.payload,
            }
        case GET_VIDEOGAMES_BYID:
            return {
                ...state,
                videogamesDetail: action.payload,
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }
        case RESET_STATE:
            return {
                ...state,
                videogamesDetail: {},
            }
        case ADD_GAME:
            return {
                ...state,
                videogames: {...state,videogames:[...state.videogames,action.payload]},
            }
        case HANDLE_ERROR:
            console.log("Llega al Reducer ok");
            return {
                ...state,
                errorMessage:action.payload
            }
        
        default:
            return {...state};
    }
}

export default reducer;