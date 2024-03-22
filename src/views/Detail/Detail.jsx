import style from './Detail.module.css'
import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

const Detail = ({allCharacters, allEpisodes}) => {
    
    const { id } = useParams()
    const [character, setCharacter] = useState([])
    const [showEpisodes, setShowEpisodes] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const foundCharacter = allCharacters.find(char => char.id == id);
        if(foundCharacter){setCharacter(foundCharacter)}
    },[allCharacters,id])

    const extractIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const getEpisodeName = (id) => {
        const foundEpisode = allEpisodes.find(ep => ep.id == id)
        return foundEpisode ? (<div>Episode {foundEpisode.id} - {foundEpisode.name}</div>) : ''
    };

    const nextId = () => {
        const currentId = allCharacters.findIndex(char => char.id == id)
        const nextId = currentId + 1
        if(nextId < allCharacters.length){
            /* console.log(allCharacters[nextId].id) */
            return allCharacters[nextId].id
        } else {
            return 826
        }
    };

    const prevId = () => {
        const currentId = allCharacters.findIndex(char => char.id == id)
        const prevId = currentId - 1
        if(prevId > 0){
            /* console.log(allCharacters[prevId].id) */
            return allCharacters[prevId].id
        } else {
            return 1
        }
    };

    const toggleEpisodes = () => {
        setShowEpisodes(!showEpisodes)
    };

    const getBackRoute = () => {
        if(location.state && location.state.from){
            return location.state.from
        }
        return '/'
    }

    return(
        <div className={style.container}>

            <div className={style.mainBox}>

                <div className={style.topBox}>
                    <div className={style.leftBox}>
                        <p className={style.name}>{character.name}</p>
                        <img className={style.image} src={character.image} alt={character.name} />
                        <p className={style.id}>Character ID: {character.id}</p>
                    </div>

                    <div className={style.rightBox}>
                        <p className={style.characterInfo}><span className={style.labelSpan}>Status:</span> {character.status}</p>
                        <p className={style.characterInfo}><span className={style.labelSpan}>Specie:</span> {character.species}</p>
                        {character.type && (<p className={style.characterInfo}><span className={style.labelSpan}>Type:</span> {character.type}</p>)}
                        <p className={style.characterInfo}><span className={style.labelSpan}>Gender:</span> {character.gender}</p>
                        <p className={style.characterInfo}><span className={style.labelSpan}>First seen in:</span> {character.origin && character.origin.name}</p>
                        <p className={style.characterInfo}><span className={style.labelSpan}>Last known location:</span> {character.location && character.location.name}</p>
                    </div>
                </div>

                <div className={style.bottomBox}>
                    <p className={style.episodesLabel} onClick={toggleEpisodes}>Episodes</p>
                    {character.episode && character.episode.length > 0 && (
                        <ul className={`${style.ul} ${showEpisodes ? style.show : style.hide}`}>
                            {character.episode.map(ep => (
                                <li className={style.li} key={ep}>{
                                    getEpisodeName(extractIdFromUrl(ep))
                                }</li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className={style.controls}>

                    {/* <Link className={style.controlButton} to={`/detail/${prevId()}`}><div>previous</div></Link> */}
                    <Link className={style.controlButton} to={getBackRoute()}>
                        <div>Back</div>
                    </Link>
                    {/* <Link className={style.controlButton} to={`/detail/${nextId()}`}><div>next</div></Link> */}
                
                </div>

            </div>
            
        </div>
    )
}

export default Detail;