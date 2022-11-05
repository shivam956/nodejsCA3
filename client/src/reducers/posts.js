import * as actionType from '../constants/actionTypes';

const postsReducer =  (posts = [], action) => {
    switch (action.type) {
        case actionType.LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case actionType.DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case actionType.UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case actionType.FETCH_ALL:
            return action.payload;
        case actionType.CREATE:
            return [ ...posts, action.payload];
        default:
            return posts;
    }
}

export default postsReducer;