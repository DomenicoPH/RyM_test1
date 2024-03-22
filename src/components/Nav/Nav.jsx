import style from './Nav.module.css'
import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <div className={style.navContainer}>

            <Link className={style.link} to={'/home'}>
                <div className={style.leftContainer}>
                        <img src="" alt="" />
                        <p className={style.navLogo}>Rick & Morty App</p>
                </div>
            </Link>

            <div className={style.rightContainer}>

                {/* <Link className={style.link} to={'/all'}>
                    <p className={style.navLink}>All Characters</p>
                </Link> */}

                <Link className={style.link} to={'/mycharacters'}>
                    <p className={style.navLink}>Characters</p>
                </Link>

                <Link className={style.link} to={'/favorites'}>
                    <p className={style.navLink}>Favorites</p>
                </Link>

                <Link className={style.link} to={'/episodes'}>
                    <p className={style.link}>Episodes</p>
                </Link>

                <Link className={style.link} to={'/about'}>
                    <p className={style.navLink}>About</p>
                </Link>

            </div>

        </div>
    )
}

export default Nav;