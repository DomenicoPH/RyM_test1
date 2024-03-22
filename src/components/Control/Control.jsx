import style from './Control.module.css'
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/img/rmlogo.png'

const Control = (props) => {

    return(
        <div className={style.container}>
            
            <div className={style.logoContainer}>
                <img className={style.logoImage} src={logo} alt="Logo" />
            </div>

            <p className={style.countLabel}>Character count</p>
            <div className={style.countNumber}>{props.myCharacters.length}</div>

            <button className={style.boton} onClick={props.onRandom}>Random</button>
            <button className={style.boton} onClick={props.bringAllCharacters}>All Characters</button>
            <button className={style.boton} onClick={props.clearMyCharacters}>Clear List</button>

            <SearchBar
                allCharacters={props.allCharacters}
                myCharacters={props.myCharacters}
                setMyCharacters={props.setMyCharacters}
                onSearch={props.onSearch}
            />   

        </div>
    )
}

export default Control;