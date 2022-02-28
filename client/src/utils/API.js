import axios from "axios";
import {follow, loginFailure, loginStart, loginSuccess, unfollow} from "../store/actions/user";
import {createPost, deletePost, getAllPosts, getUsersPosts, updateLikes} from "../store/actions/posts";

export default {
    //user
    getUser: async (userData) => await axios.get(`api/users?username=${userData}`),
    getUserById: async (userData) => await axios.get(`api/users?userId=${userData}`),
    getFollowings: async (userData) => await axios.get(`api/users/followings/${userData}`),
    getFollowers: async (userData) => await axios.get(`api/users/followers/${userData}`),

    login: async (email, password, dispatch) => {
        dispatch(loginStart());
        const body = {email, password};

        try {
            const response = await axios.post('api/auth/login', body);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginFailure(error));
        }
    },

    follow: async (url, userData, dispatch) => {
        try {
            const response = await axios.put(`api/users/${url}/follow`, userData);
            dispatch(follow(response.data));
        } catch (error) {
            console.log(error);
        }
    },

    unfollow: async (url, userData, dispatch) => {
        try {
            const response = await axios.put(`api/users/${url}/unfollow`, userData);
            dispatch(unfollow(response.data));
        } catch (error) {
            console.log(error);
        }
    },

    getAllPosts: async (posts, dispatch) => {
        try {
            const response = await axios.get('api/posts/timeline/' + posts);
            dispatch(getAllPosts(response.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            ));
        } catch (error) {
            console.log(error)
        }
    },

    getUsersPosts: async (posts, dispatch) => {
        try {
            const response = await axios.get('api/posts/profile/' + posts);
            dispatch(getUsersPosts(response.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            ));
        } catch (error) {
            console.log(error)
        }
    },

    deletePost: async (post, user, dispatch) => {
        try {
            await axios.delete(`api/posts/${post}`, {data: {userId: user}});
            dispatch(deletePost(post))
        } catch (error) {
            console.log(error)
        }
    },

    updateLikes: async (post, user, dispatch) => {
        try {
            await axios.put('api/posts/' + post + '/like', {userId: user});
            dispatch(updateLikes(user));
        } catch (error) {
            console.log(error)
        }
    },

    createPost: async (post, dispatch) => {
        try {
            const response = await axios.post("api/posts", post);
            dispatch(createPost(response.data))
        } catch (error) {
            console.log(error)
        }
    },

    uploadFile: async (data) => {
        try {
            await axios.post("api/upload", data);
        } catch (error) {
            console.log(error)
        }
    }

}