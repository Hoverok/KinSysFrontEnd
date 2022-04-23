import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import { Alert } from 'reactstrap';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

export const addDish = (dish) => ({
    type: ActionTypes.ADD_DISH,
    payload: dish
});

export const postDish = (name, image, imagebig, tel, label, work, achievement, featured, description) => (dispatch) => {

    const newDish = {
        name: name,
        image: image,
        imagebig: imagebig,
        tel: tel,
        label: label,
        work: work,
        achievement: achievement,
        featured: featured,
        description: description

    };
    //newDish.date = new Date().toISOString();

    return fetch(baseUrl + 'dishes', {
        method: "POST",
        body: JSON.stringify(newDish),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addDish(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('Skelbimas užregistruotas');
            //\nError: ' + error.message);
        });
};

export const putDish = (dishid, name, image, imagebig, tel, label, work, achievement, featured, description) => (dispatch) => {

    const updatedDish = {
        name: name,
        image: image,
        imagebig: imagebig,
        tel: tel,
        label: label,
        work: work,
        achievement: achievement,
        featured: featured,
        description: description

    };
    //newDish.date = new Date().toISOString();


    return fetch(baseUrl + 'dishes' + '/' + dishid, {
        method: "PUT",
        body: JSON.stringify(updatedDish),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addDish(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('Skelbimas atnaujintas')
            // + 'nError: ' + error.message);
        });
};

export const deleteDish = (dishid) => (dispatch) => {

    //newDish.date = new Date().toISOString();

    return fetch(baseUrl + 'dishes' + '/' + dishid, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addDish(response)))
        .catch(error => {
            //console.log('Post trainer ', error.message);
            alert('Skelbimas pašalintas')
            // + 'nError: ' + error.message);
        });
};


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));;
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { //if you dont hear anything from the server
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));;
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
