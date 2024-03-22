import style from './MyCharacters.module.css'
import Control from '../../components/Control/Control';
import Cards from '../../components/Cards/Cards';

const MyCharacters = (props) => {

    return(
        <div className={style.superContainer}>

            <div className={style.container}>
                <Control
                    allCharacters={props.allCharacters}
                    myCharacters={props.myCharacters}
                    setMyCharacters={props.setMyCharacters}
                    onSearch={props.onSearch}
                    onRandom={props.onRandom}
                    clearMyCharacters={props.clearMyCharacters}
                    bringAllCharacters={props.bringAllCharacters}
                />

                <div className={style.cardsContainer}>
                    <Cards 
                        myCharacters={props.myCharacters}
                        onClose={props.onClose}
                        />
                </div>
            </div>

        </div>
    )
}

export default MyCharacters;