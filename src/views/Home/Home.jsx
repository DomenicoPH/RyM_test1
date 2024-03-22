import style from './Home.module.css'
import rymLogo from '../../assets/img/rym.svg'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();
    
    const handleNavigate = (path) => {
        navigate(path)
    }

    return(
        <div className={style.container}>
            
            <div className={style.subContainer}>

                <img src={rymLogo} alt="Rick and Morty" />

                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => handleNavigate('/mycharacters')}>Characters</button>
                    <button className={style.button} onClick={() => handleNavigate('/episodes')}>Episodes</button>
                    <button className={style.button} onClick={() => handleNavigate('/')}>Salir</button>
                </div>

            </div>

        </div>
    )
}

export default Home;