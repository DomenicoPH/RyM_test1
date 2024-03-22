import style from './SearchBar.module.css'
import { useState, useRef } from 'react'

const SearchBar = (props) => {

    const [characterId, setCharacterId] = useState([])
    const inputRef = useRef(null)

    const handleChange = (e) => {
        setCharacterId(e.target.value)
    }

    const handleSearch = () => {
        props.onSearch(characterId);
        clearInput();
        inputRef.current.focus()
    }

    const clearInput = () => {
        setCharacterId('')
    }

    const pressEnter = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            handleSearch();
        }
    }

    return(
        <div className={style.container}>
            <input 
                type='number' 
                name='search'
                id='search'
                placeholder='Character ID here'
                ref={inputRef}
                value={characterId}
                onChange={handleChange}
                onKeyPress={pressEnter}
                className={style.input}
            />
            <button 
                onClick={handleSearch}
                className={style.boton}
            >Search!</button>
        </div>
    )
}

export default SearchBar;