import style from './Card.module.css'
import unlike from '../../assets/img/heart.svg';
import like from '../../assets/img/heart_filled.svg';
import close from '../../assets/img/close.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/actions';
import { useEffect, useState } from 'react';

const Card = (props) => {

    const {addFavorite, removeFavorite, favorites} = props;
    const [favorite, setFavorite] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        favorites.forEach(
            (fav) => {
                if(fav.id === props.id){
                    setFavorite(true)
                }
            }
        )
    },[favorites])

    const navigateHandler = () => {
        /* navigate(`/detail/${props.id}`) */
        navigate(`/detail/${props.id}`, {state: {from: pathname}})
    }

    const handleFavorite = (character) => {
        if(!favorite){
            addFavorite(character)
            setFavorite(true)
        } else {
            removeFavorite(character)
            setFavorite(false)
        }
    }

    return(
        <div className={style.superContainer}>

            <div className={style.buttonContainer}>
                {
                favorite ? (
                      <button className={style.cardFav} onClick={() => handleFavorite(props.id)}>
                         <img src={like} alt='favorite icon' />
                      </button>
                   ) : (
                      <button className={style.cardFav} onClick={() => handleFavorite(props)}>
                         <img src={unlike} alt='favorite icon' />
                      </button>
                   )
                }
                {pathname === '/mycharacters' && <button className={style.cardClose} onClick={props.onClose}><img src={close} alt="Close icon" /></button>}
            </div>
        
            <div className={style.container}>

                <div className={favorite ? style.imageContainerFav : style.imageContainer}>
                    <img 
                        className={favorite ? style.imageFav : style.image} 
                        src={props.image} 
                        alt={props.name}
                        onClick={navigateHandler}    
                    />
                </div>

                <p className={favorite ? style.nameFav : style.name}>{props.name}</p>

            </div>

        </div>
    )
}

function mapStateToProps(state){
    return{
        favorites: state.favorites
    }
}

function mapDispatchToProps(dispatch){
    return{
        addFavorite: (character) => dispatch(addFavorite(character)),
        removeFavorite: (id) => dispatch(removeFavorite(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);