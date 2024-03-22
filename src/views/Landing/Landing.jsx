import style from './Landing.module.css'
import spiral from '../../assets/img/spiral.png'
import { Link } from 'react-router-dom'
import Form from '../../components/Form/Form'

const Landing = (props) => {
    return(
        <div className={style.container}>
                <img className={style.spiral} src={spiral} alt="spiral" />
                <h2 className={style.title}>Rick And Morty</h2>
                <Form login={props.login} />
                <h4 className={style.subtitle}>The app inspired by the motherf*cking series</h4>
        </div>
    )
}

export default Landing;