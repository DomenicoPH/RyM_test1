import style from './Episodes.module.css'
import Card from '../../components/Card/Card';
import { useState } from 'react';

const Episodes = (props) => {

    const [visibleEpisodeId, setVisibleEpisodeId] = useState(null)

    const toggleCharactersVisibility = (episodeId) => {
        setVisibleEpisodeId(episodeId === visibleEpisodeId ? null : episodeId);
    }
    const isEpisodeVisible = (episodeId) => {
        return episodeId === visibleEpisodeId
    }
    
    const extractIdFromUrl = (url) => { // Función para extraer el ID de la URL
        const parts = url.split('/'); // Dividir la URL por las barras
        return parts[parts.length - 1]; // El ID es el último elemento de la URL
    };

    return(
        <div className={style.container}>

            <div className={style.header}>
                <h1 className={style.episodeHeaderTitle}>Episodes</h1>
            </div>

            {props.allEpisodes && props.allEpisodes.map(ep => (

                <div className={style.episodeContainer} key={ep.id}>

                    <div className={style.infoContainer}>
                        <h3 className={style.episodeIdNumber}>{ep.id}</h3>
                        <h3 className={style.episodeId}>Episode {ep.id}</h3>
                        <h3 className={style.episodeTitle}>"{ep.name}"</h3>
                        <h3 className={style.episodeDate}>{ep.air_date}</h3>
                        <h3 
                            className={style.toggleCharacters} 
                            onClick={() => toggleCharactersVisibility(ep.id)}
                        >
                            Characters
                        </h3> {/* boton para mostrar/ocultar characters x episode */}

                        <h3 className={style.episodeCode}>{ep.episode}</h3>
                    </div>

                    <div className={`${style.charactersInEpisode} ${isEpisodeVisible(ep.id) ? style.show : style.hide}`}>
                        {/* Filtrar los personajes basados en los IDs de la URL */}
                         {ep.characters.map(charUrl => {
                            // Extraer el ID de la URL
                            const charId = extractIdFromUrl(charUrl);
                            // Encontrar el personaje en allCharacters basado en el ID
                            const character = props.allCharacters.find(char => char.id == charId);
                            // Si se encuentra el personaje, mostrar su nombre
                            if (character) {
                                return (
                                    <Card
                                        key={charId}
                                        id={character.id}
                                        name={character.name}
                                        image={character.image}
                                    />
                                )
                            } else {
                                // Si no se encuentra el personaje, mostrar un mensaje indicando que no se encontró
                                return <p key={charId}>Personaje no encontrado</p>;
                            }
                        })}
                    </div>

                </div>

            ))}
        </div>
    )
}

export default Episodes;