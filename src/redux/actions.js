export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

// addFavorite añade un personaje al estado global 'favorites' 
// (character es un objeto)
export const addFavorite = (character) => {
    return{
        type: ADD_FAV,
        payload: character
    }
}

// removeFavorite elimina el peronaje con el id pasado por parámetro.
// (id es el id del personaje)
export const removeFavorite = (id) => {
    return{
        type: REMOVE_FAV,
        payload: id
    }
}