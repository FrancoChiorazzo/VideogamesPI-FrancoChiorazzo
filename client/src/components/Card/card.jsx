import { Link } from "react-router-dom"
import style from "./card.module.css"
const VidegoameCard = ({id, name, image, genres}) => {
    return (
        <div className={style.container}>
            <Link className={style.cardLink} to= {`/videogames/${id}`}>
                <h1 className={style.name}> {name} </h1>
                <img src={image} alt={name} className={style.pictures}/>
                <h3 className={style.genres}>{genres.map((g)=>{
                    return <li key={g.name}>{g.name}</li>
                })}</h3>
            </Link>
            
        </div>
    )
}

export default VidegoameCard