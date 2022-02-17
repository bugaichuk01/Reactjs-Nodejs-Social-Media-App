import {LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS} from "../constants/actionTypes";

const initialState = {
    user: null,
    isFetching: false,
    error: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;