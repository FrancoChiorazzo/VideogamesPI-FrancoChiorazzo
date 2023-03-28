import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogamesByName, getGenres} from "../../redux/actions/index"
import HomePage from "../Home/Home";


export default function DataManagement(props){
//     //Makes a dispatch each time home is mounted & requires info from backend.
    const dispatch = useDispatch()
let name = props.name
let genreFilter = props.genreFilter
let origin = props.origin
let sort = props.sort
let page = props.page


    //Brings the information from the global state with useSelector
    let allVideogames = useSelector((state) => state.videogames.games)
    useEffect(()=> {
        dispatch(getGenres())
        dispatch(getVideogamesByName(name,origin, genreFilter, sort,page))
    }, [dispatch, name, origin, genreFilter, sort,page])
return (
    <div>
        <HomePage allVideogames={allVideogames} />
    </div>
)  
}