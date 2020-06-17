import {createStore, combineReducers} from 'redux';
import {Dishes} from './dishes'
import {Leaders} from './leaders'
import {Comments} from './comments'
import {Promotions} from './promotions'

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        dishes: Dishes,
        leaders : Leaders,
        promotions: Promotions,
        comments: Comments
    }
    ));
    return store;
}