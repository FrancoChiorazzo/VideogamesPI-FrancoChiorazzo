import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getVideogamesById, resetVideogamesDetail} from "../../redux/actions/index"
import styles from "./Detail.module.css"

const Detail = () => {
    const dispatch = useDispatch();
    const {id} = useParams(); //takes the id form the url as it is a parameter given in the link
    
    //Selects from the global state only the characterDetail property
    const videogamesDetail = useSelector((state) => state.videogamesDetail)
    useEffect(()=>{
        dispatch(getVideogamesById(id));
        return () =>
            dispatch(resetVideogamesDetail())
    },[dispatch, id])
    return (
        <>
        <div>
        <Link to={`/home`}>
            <input
                type="image"
                src="https://cdn-icons-png.flaticon.com/512/10009/10009304.png"
                id="image"
                alt="Login"
                className={styles.buttonBack}></input>
        </Link>
        </div>
        <br />
        <div className={styles.container}>
                <img className={styles.pictures} src={videogamesDetail.background_image} alt={videogamesDetail.name} />

                <h1 className={styles.titleDetail}>{videogamesDetail.name}</h1>
                
                <h3> Rating: {videogamesDetail.rating} </h3>

                <p dangerouslySetInnerHTML={{ __html: videogamesDetail.description }}></p>

                <h3> {videogamesDetail.platforms?.join(", ")} </h3>
                <h3>{videogamesDetail.genres?.map((g) => {
                    return <p key={g.name}>{g.name}</p>;
                })}</h3>

                <h3> {videogamesDetail.released} </h3>
                
            </div></>
    )
}

export default Detail