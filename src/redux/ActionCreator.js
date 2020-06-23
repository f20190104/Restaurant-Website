import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseURL';
export const addComment = (comment) => ({
    type : ActionTypes.ADD_COMMENT, //each action has its own type
    payload : comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch (baseUrl + 'comments', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newComment),
        credentials: 'same-origin'
        }
    )
    .then(response => {
        if (response.ok){
            return response;
        }
        else {
            var error = new Error("Error " + response.status +": " + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error =>{
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then (comment => dispatch(addComment(comment)))
    .catch (error => {
        console.log(error.message);
        alert("Your comment cannot be posted due to server errors!")
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch (baseUrl+'dishes')
        .then(response => {
            if (response.ok){
                return response;
            }
            else {
                var error = new Error("Error " + response.status +": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error =>{
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error=> dispatch(dishesFailed(error.message)));
}
export const fetchComments = () => (dispatch) => {
    return fetch (baseUrl+'comments')
        .then(response => {
            if (response.ok){
                return response;
            }
            else {
                var error = new Error("Error " + response.status +": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error =>{
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => (dispatch(addComments(comments))) )
        .catch(error=>(dispatch(commentsFailed(error.message))));
        
}
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch (baseUrl+'promotions')
        .then(response => {
            if (response.ok){
                return response;
            }
            else {
                var error = new Error("Error " + response.status +": " + response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error =>{
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(promos => (dispatch(addPromos(promos))) )
        .catch(error=>(dispatch(promosFailed(error.message))));
}

//DISHES Actions
export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
});
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload : dishes
});
export const dishesFailed = (ErrMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload : ErrMess
});

//COMMENTS Actions
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload : comments
});
export const commentsFailed = (ErrMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload : ErrMess
});

//PROMOS Actions
export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING
});
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload : promos
});

export const promosFailed = (ErrMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload : ErrMess
});