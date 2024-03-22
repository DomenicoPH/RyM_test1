import style from './Favorites.module.css'
import Cards from '../../components/Cards/Cards';
import { connect } from 'react-redux'

const Favorites = ({favorites}) => {
    console.log(favorites)
    return(
        <div className={style.favoritesContainer}>

            <div className={style.header}>
                <h1 className={style.episodeHeaderTitle}>Favorites</h1>
            </div>
            <Cards myCharacters={favorites}/>
            
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
        favorites: state.favorites
    }
}

export default connect(mapStateToProps,null)(Favorites);

