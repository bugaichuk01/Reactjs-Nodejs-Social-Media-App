import axios from "axios";
import {loginFailure, loginStart, loginSuccess, follow, unfollow} from "../store/actions";

export default {
    //auth
    login: async (user, dispatch) => {
        dispatch(loginStart());
        try {
            const response = await axios.post('api/auth/login', user);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginFailure(error));
        }
    },

    //users
    getUser: async (userData) => await axios.get(`api/users?username=${userData}`),
    getUserById: async (userData) => await axios.get(`api/users?userId=${userData}`),
    getFollowings: async (userData) => await axios.get(`api/users/followings/${userData}`),
    getFollowers: async (userData) => await axios.get(`api/users/followers/${userData}`),

    followUser: async (url, userData, dispatch) => {
        try {
            const response = await axios.put(`api/users/${url}/follow`, userData);
            dispatch(follow(response.data));
        } catch (error) {
            console.log(error);
        }
    },

    unfollowUser: async (url, userData, dispatch) => {
        try {
            const response = await axios.put(`api/users/${url}/unfollow`, userData);
            dispatch(unfollow(response.data));
        } catch (error) {
            console.log(error);
        }
    },

    //posts
    getPosts: async (profileData, timelineData) => {
        return profileData
            ? await axios.get('api/posts/profile/' + profileData)
            : await axios.get('api/posts/timeline/' + timelineData);
    }
}