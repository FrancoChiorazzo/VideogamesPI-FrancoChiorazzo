import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";


export default function LandingPage(){
    return (
    <div className={styles.textFormat}>
        <h2>Press</h2>
        <Link to='/home'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/START_logo_2021.svg/1280px-START_logo_2021.svg.png" alt="start" className={styles.startImage}/>
        </Link>
        <h2>to begin</h2>
    </div>
    )
}