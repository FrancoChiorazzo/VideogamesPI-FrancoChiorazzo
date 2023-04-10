import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { getGenres, getVideogames, addGame} from "../../redux/actions/index"
import validate from "../Validation/validation";
import style from "./form.module.css"


const Form = () => {
  const dispatch = useDispatch()
  const genreWritten = React.useRef(null);
  useEffect(()=> {
    dispatch(getVideogames())
    dispatch(getGenres())

}, [dispatch])

//set Local state for handling information
const [newGame,setNewGame] = useState({
  name: "",
	image: "",
	description: "",
	platforms: [],
	released: "",
	rating: 0,
	genre: []
})

//Obtain all the videogame Platforms from the global state.
    let allVideogames = useSelector((state) => state.videogames.games)
    let arrayofplatforms = allVideogames?.map((game) => game.platforms)
    let platforms = [...new Set(arrayofplatforms?.flat())]

//Obtain all the videogame Genres from the global state.
    let arrayofgenres = useSelector((state) => state.genres)
    let genres = arrayofgenres.genres?.map((g)=>g.name);

function handleChange(event) {
  const value = event.target.value
  const property = event.target.name;
  setNewGame({...newGame,[property]:value})
  setErrors(validate({...newGame, [event.target.name]:event.target.value}))
}

function handleMultipleOptions(event) {
  const value = event.target.value
  const isChecked = event.target.checked
  const property = event.target.name;
  let platforms = newGame.platforms.slice();
  platforms=[...new Set(platforms)]
  setErrors(validate({...newGame, [event.target.name]:event.target.value}))
  if (isChecked) {
    platforms.push(value)
    setErrors(validate({...newGame, [event.target.name]:platforms}))  
  } else {
    const index = platforms.indexOf(value);
    platforms.splice(index, 1);
    setErrors(validate({...newGame, [event.target.name]:platforms}))
  }
  setNewGame({ ...newGame, [property]:platforms });
  setErrors(validate({...newGame, [event.target.name]:platforms}))
}

function handleClick(event) {
  event.preventDefault()
  
  const newGenre = genreWritten.current.value;
    setErrors(validate({...newGame, genre:event.target.value}))

  //if it is not a valid genre, do not add.
  if (!genres?.includes(newGenre)) { return alert("Please choose a valid genre")
  }
    //if the genre is already set, remove it from the list
    if (newGame.genre?.includes(newGenre)) {
      let aux = newGame.genre?.filter((el)=>el!==newGenre)
      setNewGame({...newGame,genre:aux})
  setErrors(validate({...newGame, genre:aux}))

  } else {
  //if it is not, add it to the former array of genres
  setNewGame(prevState => ({
    ...prevState,
    genre: [...prevState.genre,newGenre]
  }))
  setErrors(validate({...newGame, genre:newGenre}))
  } 
  genreWritten.current.value = "" 
}
function handleClear(event) {
  event.preventDefault()
  setNewGame({...newGame,genre:[]})
  setErrors(validate({...newGame, genre:[]}))
}
//----------------HANDLE SUBMIT + ERRORS-----------------------------
//set state for errors:
const[errors,setErrors] = useState({})


async function handleSubmit (event) {
  event.preventDefault();
  setErrors(validate({...newGame, [event.target.name]:event.target.value}))
  setNewGame({...newGame,[event.target.name]:event.target.value})

  const arrayErrors = Object.keys(errors)
  if (arrayErrors.length||newGame.name==="") {
    alert("Please check errors before submitting")
  } else 
  {dispatch (addGame(newGame))
  alert("Game created")
  setNewGame({
    name: "",
    image: "",
    description: "",
    platforms: [],
    released: "",
    rating: 0,
    genre: []
  })
  }
}
  return (
    <div className={style.Form} >
    <div className={style.containerForm}>
      <form onSubmit={handleSubmit}>
      <h2>Complete the fields to add the new game</h2>
      <label htmlFor="name">Name </label>
      <input name="name" value={newGame.name} onChange={handleChange} />
      <span>{errors.name}</span>
    <br />
      <label htmlFor="image">Image URL </label>
      <input type="url" placeholder="https://example.com" name="image" value={newGame.image} onChange={handleChange} />
      <span>{errors.image}</span>
    <br />
      <label htmlFor="description">Description </label>
      <input name="description" value={newGame.description} onChange={handleChange}/>
      <span>{errors.description}</span>
    <br />
    <legend>Select Platforms:</legend>
    <div className={style.platformsContainer}>
  {platforms?.map((p) => (
    <div key={p} className={style.platform}>
      <input type="checkbox" id={p} value={p} name="platforms" onChange={handleMultipleOptions} />
      <label htmlFor={p}>{p}</label>
    </div>
  ))}
  <span className={style.platformsError}>{errors.platforms}</span>
</div>
    <br />
    <label htmlFor="released">Release Date </label>
    <input type="date" name="released"
       min="1958-10-10" max="2030-12-31" value={newGame.released} onChange={handleChange}></input>
      <span>{errors.released}</span>
    <br />
    <label htmlFor="rating">Rating </label>
    <input type="range" id="rating" name="rating" min="0" max="5" value={newGame.rating} onChange={handleChange} /><p>Value: <output id="value">{newGame.rating}</output></p>
    <span>{errors.rating}</span>
    <br />
    <label htmlFor="Genres" id="genreSelector">Select genres </label>
<input name="genres" ref={genreWritten} list="ListOfGenres"/>
<datalist id="ListOfGenres">
  {genres?.map((genre)=>{
    return <option key={genre} value={genre} />})}
</datalist>
<button onClick={handleClick}>Add/Remove Genre</button>
<button onClick={handleClear}>Clear All Genres</button>
<span>{errors.genre}</span>
<br />
<strong>Your selection of genres:</strong><p>{newGame.genre?.map((g)=>{return <span key={g}>{g}</span> })}</p>
<br />
<button type="submit" id="submit" >Submit</button>
</form>
    </div>

<div className={style.preview}>
<h2>Preview</h2>
  <div className={style.containerPreview}>
    <div className={style.imagePreview}>
      <img src={newGame.image} alt={newGame.image || "image preview"} className={style.pictures}/>
    </div>
    <div className={style.scrollableContainer}>
    <div className={style.container}>
      <h1 className={style.name}> {newGame.name || "Name"} </h1>
      <h3> Rating: {newGame.rating} </h3>   
      <p className={style.description}> {newGame.description||"Description"}</p>
      <h3> Platforms: {newGame.platforms.map((e)=> {return <p className={style.platforms}>{e}</p>})} </h3>


      <h3 className={style.genres}> Genres: {newGame.genre?.map((g)=>{
        return <ul key={g}>{g}</ul>
        })||"Genres"
        }
      </h3>
      </div>
    </div>
</div>
</div></div>
  )
};

export default Form;
