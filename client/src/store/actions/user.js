import {FOLLOW, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, UNFOLLOW} from "../constants/actionTypes";
import axios from "axios";

//auth
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

export const login = async (email, password, dispatch) => {
    dispatch(loginStart());
    const body = {email, password};

    try {
        const response = await axios.post('api/auth/login', body);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

//followers and followings
export const follow = (userId) => ({
    type: FOLLOW,
    payload: userId
});

export const unfollow = (userId) => ({
    type: UNFOLLOW,
    payload: userId
});

export const followUser = async (url, userData, dispatch) => {
    try {
        const response = await axios.put(`api/users/${url}/follow`, userData);
        dispatch(follow(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const unfollowUser = async (url, userData, dispatch) => {
    try {
        const response = await axios.put(`api/users/${url}/unfollow`, userData);
        dispatch(unfollow(response.data));
    } catch (error) {
        console.log(error);
    }
};