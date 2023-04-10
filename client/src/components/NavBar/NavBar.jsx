import React from "react"
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = (props) => {
  return (
    <div className={style.navBar}>
      <br /><div>
        <h1>Henry Videogames database</h1>
      </div>

      <div className={style.gameCreation}>
      <Link to='/createGame'><button className={style.createGameButton}>Add your own games!</button></Link>
      </div>

      <div className={style.logouthome}>
      <Link to='/home'><input 
                type="image"
                src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                id="image"
                alt="Login"
                className={style.buttonHome}></input></Link> 
      <Link to='/'><input
                type="image"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
                id="LogOut"
                alt="LogOut"
                className={style.buttonLogOut}></input></Link>
      </div>


    </div>
  )
};

export default NavBar;
