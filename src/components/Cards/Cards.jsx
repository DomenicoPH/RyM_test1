import style from './Cards.module.css'
import Card from '../Card/Card';

const Cards = ({myCharacters, onClose}) => {

    return(
        <div className={style.container}>

            {myCharacters && myCharacters.map((char) => (
                <Card 
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    image={char.image}
                    onClose={() => onClose(char.id)}
                />
            ))}
        </div>
    )
}

export default Cards;