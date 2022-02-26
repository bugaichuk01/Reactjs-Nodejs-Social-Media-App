import {FOLLOW, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, UNFOLLOW} from "../constants/actionTypes";

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    isFetching: false,
    error: false
};

export const userReducer = (state = initialState, action) => {
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
            };
        case FOLLOW:
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                }
            }
        case UNFOLLOW:
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings.filter(
                        (following) => following !== action.payload
                    )]
                }
            }
        default:
            return state;
    }
}
