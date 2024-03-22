import style from './All.module.css'
import Cards from '../../components/Cards/Cards';

const All = (props) => {
    return(
        <div className={style.container}>
            <Cards allCharacters={props.allCharacters} />
        </div>
    )
}

export default All;