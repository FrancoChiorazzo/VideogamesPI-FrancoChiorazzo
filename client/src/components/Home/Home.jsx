import React from "react";
import VideogameCard from "../Card/card";
import styles from "./home.module.css"


export default function HomePage(props){
    
let allVideogames = props.allVideogames


    return (
    <div className={styles.CardsByPage}>
        {/* Map each videogame into a single card using map */}
        {
            allVideogames?.map((videogame)=>{
                return (
                    <VideogameCard
                // as we are receiving info from the api with the "?" we make sure that we are getting the info and the app does not crash
                       key={videogame?.id}
                       id = {videogame.id} 
                       name = {videogame?.name}
                       image = {videogame?.background_image}
                       genres = {videogame?.genres}
                    />
                )
        })}
    </div>
    )
};