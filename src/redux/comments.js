import * as ActionTypes from './ActionTypes';
export const Comments = (state={ErrMess: null, comments:[]}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return{...state, comments : state.comments.concat(comment)};
        case ActionTypes.COMMENTS_FAILED:
            return{...state, ErrMess: action.payload, comments:[]};
        case ActionTypes.ADD_COMMENTS:
            return {...state, ErrMess: null, comments: action.payload}; 
        default: return state;
    }
}