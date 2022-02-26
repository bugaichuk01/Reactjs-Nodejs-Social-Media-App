import {FOLLOW, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, UNFOLLOW} from "../constants/actionTypes";

export const loginStart = () => ({
    type: LOGIN_START
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const follow = (userId) => ({
    type: FOLLOW,
    payload: userId
});

export const unfollow = (userId) => ({
    type: UNFOLLOW,
    payload: userId
});
