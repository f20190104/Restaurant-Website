import * as ActionTypes from './ActionTypes'

export const addComment = (dishId, rating, author, comment) => ({
    type : ActionTypes.ADD_COMMENT, //each action has its own type
    payload : {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});