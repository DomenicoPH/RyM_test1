import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import All from './views/All/All';
import MyCharacters from './views/MyCharacters/MyCharacters';
import Landing from './views/Landing/Landing';
import About from './views/About/About';
import Home from './views/Home/Home';
import Episodes from './views/Episodes/Episodes';
import Detail from './views/Detail/Detail';
import Favorites from './views/Favorites/Favorites';

function App() {

  const BASE_URL = "https://rickandmortyapi.com/api/character";
  const EP_URL = "https://rickandmortyapi.com/api/episode";

  const [allCharacters, setAllCharacters] = useState([]);
  const [myCharacters, setMyCharacters] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [access, setAccess] = useState(false)

  const navigate = useNavigate()

  //-- Access --
  
  const USERNAME = 'test@test.com';
  const PASSWORD = '123456'

  //login
  const login = (userData) => {
    if(userData.password === PASSWORD && userData.username === USERNAME){
      setAccess(true);
      navigate('/home')
    }
  }
  useEffect(() => {
    !access && navigate('/')
  },[access]);

  //logout
  const logout = () => {
    setAccess(false)
    navigate('/')
  }
  
  //-- Access --

  // useEFfect - Trae los 826 personajes a 'allCharacters'
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allCharactersData = [];
        let page = 1;
        let totalPages = 1; // Inicialmente establecemos totalPages en 1

        // Realizamos solicitudes hasta alcanzar todas las páginas
        while (page <= totalPages) {
          const response = await axios.get(`${BASE_URL}?page=${page}&limit=100`); // Guardamos en response el paquete de datos hasta un límite de 100 personajes

          /*
            console.log('RESPONSE', response)
            // 'response' es el objeto que trae axios y en su propiedad 'data' se encuentra la información solicitada.
            console.log('RESPONSE.DATA', response.data)
            // 'response.data' es un objeto que contiene todo lo que hay en https://rickandmortyapi.com/api/character (entrar al link para ver estructura)
            console.log('RESPONSE.DATA.INFO', response.data.info)
            // el objeto 'response' en su propiedad 'data' tiene dos propiedades: 'info' y 'results' - Esto es 'info'
            console.log('RESPONSE.DATA.RESULTS', response.data.results)
            // el objeto 'response' en su propiedad 'data' tiene dos propiedades: 'info' y 'results' - Esto es 'results'
          */

          const { results, info } = response.data; // Extraemos con destructuring 'results' e 'info' de response.data
          allCharactersData = allCharactersData.concat(results);
          totalPages = info.pages; // Actualizamos totalPages con el número total de páginas
          page++;
        }
        setAllCharacters(allCharactersData); // Establecemos los personajes en el estado allCharacters
      } catch (error) {
        console.error("Error al cargar los personajes:", error);
      }
    };

    fetchAllCharacters();
  }, []);
  //console.log(allCharacters)

  useEffect(() => {
    const fetchAllEpisodes = async () => {
      try {
        let allEpisodesData = [];
        let page = 1;
        let totalPages = 1;
        while(page <= totalPages){
          const response = await axios.get(`${EP_URL}?page=${page}&limit=100`);
          const {results, info} = response.data;
          allEpisodesData = allEpisodesData.concat(results);
          totalPages = info.pages;
          page++;
        }
        setAllEpisodes(allEpisodesData);
      } catch (error) {
        console.error('Error al cargar los episodios:', error)
      }
    }
    fetchAllEpisodes()
  },[]);
  /* console.log(allEpisodes) */

  const onSearch = (id) => {
    if(!id){
        alert('invalid ID');
        return;
    }
    const character = allCharacters.find(char => char.id == id)
    if(character){
        if(myCharacters.some(char => char.id === character.id)){
            alert('Personaje en pantalla')
        } else {
            setMyCharacters(prevChars => [...prevChars, character]);
        }
    } else {
        alert('No se encontró al personaje')
    }
  }

  const onRandom = () => {
    let randomId;
    let totalCharacters = allCharacters.length;
    if(myCharacters.length === totalCharacters){
      alert('Límite de personajes alcanzado')
      return
    }
    do{
      randomId = Math.floor(Math.random() * totalCharacters) + 1
    } while (myCharacters.some(char => char.id == randomId))
      onSearch(randomId);
  }

  const clearMyCharacters = () => {
    setMyCharacters([])
  }

  const bringAllCharacters = () => {
    setMyCharacters(allCharacters)
  }

  const onClose = (id) => {
    setMyCharacters(myCharacters.filter((char) => char.id !== id))
  }

  const location = useLocation()

  return (
    <div className='App'>

      {
      location.pathname !== '/' 
      && 
      location.pathname !== '/home' 
      &&
      !location.pathname.startsWith('/detail/') 
      &&
      <Nav />
      }

      <Routes>
        <Route 
          path='/'
          element={<Landing login={login}/>}
        />
        <Route 
          path='/home'
          element={<Home />}
        />
        <Route 
          path='/all'
          element={<All 
            allCharacters={allCharacters} 
            />}
        />
        <Route
          path='/mycharacters'
          element={<MyCharacters 
            allCharacters={allCharacters} 
            myCharacters={myCharacters} 
            setMyCharacters={setMyCharacters}
            onSearch={onSearch}
            onRandom={onRandom}
            clearMyCharacters={clearMyCharacters}
            bringAllCharacters={bringAllCharacters}
            onClose={onClose}
            />}
        />
        <Route
          path='/favorites'
          element={<Favorites />}
        />
        <Route
          path='/episodes'
          element={<Episodes 
            allEpisodes={allEpisodes} 
            allCharacters={allCharacters} 
            />}
        />
        <Route 
          path='/about'
          element={<About />}
        />
        <Route 
          path='/detail/:id'
          element={<Detail 
            allCharacters={allCharacters} 
            allEpisodes={allEpisodes}
            />}
        />
      </Routes>

    </div>
  );
}

export default App;
