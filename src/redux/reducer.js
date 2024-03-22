import { ADD_FAV, REMOVE_FAV } from './actions'

const initialState = {
    favorites: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                favorites: [ ...state.favorites, action.payload ]
            }
        case REMOVE_FAV:
            return {
                ...state,
                favorites: state.favorites.filter(char => char.id !== Number(action.payload))
            }
        default:
            return {
                ...state
            }
    }
};

export default reducer;