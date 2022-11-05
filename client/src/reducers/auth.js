import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case actionType.AUTH:
            console.log("Auth Reducer");
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data};
        case actionType.LOG_OUT:
            localStorage.clear();
            return { ...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;