import { ADD_GAME, GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BYID, GET_VIDEOGAMES_BYNAME, RESET_STATE } from "../action-types/action-types";
const initialState = {
    videogames: [],
    genres: [],
    videogamesDetail: {},
    games: []
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
        
        default:
            return {...state};
    }
}

export default reducer;