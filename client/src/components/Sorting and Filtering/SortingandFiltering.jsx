import { useSelector } from "react-redux";
import React, { useState } from "react";
import DataManagement from "../DataManagement/DataManagement"
import styles from "./SortingAndFiltering.module.css"

export default function FilterBar(){

    //Brings the information from the global state with useSelector
let genres = useSelector((state) => state.genres)
let gamesObject=useSelector((state)=> state.videogames)
//------------------------FILTERING ------------------------------------------------
//Creates an array of genre names to allow the filtering
let filters = genres.genres?.map((g)=>g.name);

//set a local state for filtering by genre (ALL QUERIES)
let [queries, setQueries] = useState({
    inputName:"",
    origin:"",
    sort:"",
    page:"",
    
})
const [selectedFilters, setSelectedFilters] = useState([])

//Set how the filters for genres will work in the query input 
function handleClick(genreName) {
    
    //if the genre is already set as a filter, remove it from the list of filters
    if (genreName==="Clear") return setSelectedFilters([])
    if (selectedFilters?.includes(genreName)) {
        let aux = selectedFilters.filter((el)=>el!==genreName)
        setSelectedFilters(aux)
    } else {
    //if it is not, add it to the former array of genres
    setQueries({...queries, page:1});
    setSelectedFilters([...selectedFilters, genreName])
    }    
}

//------------------------ORIGIN OF DATA------------------------------------------------
function selectOrigin(event) {
    let selectedOrigin = event.target.value;
    setQueries({...queries, origin:selectedOrigin})
}

//--------------------------------------------searchBar---------------------------------------
const handleNameChange = (event) => {
    event.preventDefault();
    let fieldCompleted=event.target.value;
    console.log(fieldCompleted,"name input field");
    setQueries({...queries, inputName:fieldCompleted, page:1});
  };

//------------------------------Sorting----------------------------------------------------
function SortName(event) {
    let results = event.target.value
    setQueries({...queries, sort:results})
}
//-----------------------------------------Pages-----------------------------------
const handleonClickPages = (event) =>{
    setQueries({...queries, page:event.target.value})
}
const totalPages = gamesObject.totalPages
    const TotalPagesArray = []
    for (let i=1; i<= totalPages; i++){
        TotalPagesArray.push(i)
    }



//-----------------------------------------------------------------------------RETURN---------
return(
<>

    <div className={styles.pagination}>
        {/* Buttons of the Pages */}
            {
            TotalPagesArray.map(p =>{
                return <button key={p} value={p} onClick={handleonClickPages}> {p} </button>
                })
            }
    </div>
    {/* <h3>FILTERS RIBBON</h3> */}
    <div className={styles.ButtonsContainer}>
        {filters?.map((genre)=>{
            return <button 
                key={genre}
                onClick={(event) => handleClick(genre, event)}
                className={selectedFilters?.includes(genre) ? styles.selected : ''}
                    >{genre}
                </button>})}
    </div>
                
    <div className={styles.clearfilter}>
{/* Origin of data */}
                <br /><select id="originSelector" onChange={selectOrigin}className={styles.dropdown}>
                    <option hidden defaultValue="">Select a source</option>
                    <option value="ALL">All Games</option>
                    <option value="API">Search Online</option>
                    <option value="DB">Created by Me</option>
                </select>
                <input
        maxLength="8"
        type="search"
        placeholder="Search your Videogame"
        onChange={(event)=>handleNameChange(event)}
        value={queries.inputName}
        />

    <select id="Filter" onChange={SortName} className={styles.dropdown}>
                    <option hidden defaultValue="">Select a sorting Option</option>
                    <optgroup label="Name">
                    <option value="A-Z" >Ascending</option>
                    <option value="Z-A">Descending</option>
                    </optgroup>
                    <optgroup label="Rating">
                    <option value="1-5">Lowest to Highest (1-5)</option>
                    <option value="5-1">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <option value="">Remove sort</option>
                </select>
    <button 
    onClick={() => handleClick("Clear")}
        >Clear Genres
    </button>
    </div>
    
    <DataManagement 
                    genreFilter={selectedFilters}
                    origin={queries.origin}
                    name = {queries.inputName}
                    sort = {queries.sort}
                    page = {queries.page}
                />



</>)

}