import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage(){
    return (
    <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRucHf7WStrySLdzPVTqqe24G3rqASczSzhug&usqp=CAU" alt="IMG game over" />
        <h1>This page is not available!</h1>
        <Link to='/home'>
        <button>return to the Home Page</button>
        </Link>
    </div>
    )
}