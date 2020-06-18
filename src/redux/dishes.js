import * as ActionTypes from './ActionTypes'
export const Dishes = (state= {isLoading: true, ErrMess: null, dishes:[]}, action) => {
    switch(action.type) {
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, ErrMess: null, dishes:[] };
        case ActionTypes.DISHES_FAILED:
            return{...state, isLoading: false, ErrMess: action.payload, dishes:[]};
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, ErrMess: null, dishes: action.payload};
        default: return state;
    }
}