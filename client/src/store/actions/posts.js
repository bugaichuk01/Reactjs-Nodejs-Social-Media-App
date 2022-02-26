import {DELETE_POST, GET_ALL_POSTS, GET_USERS_POSTS} from "../constants/actionTypes";
import axios from "axios";

/*
export const deletePost = () => ({
    type: DELETE_POST
});

export const onDelete = async (post, user, dispatch) => {
    try {
        await axios.delete(`api/posts/${post}`, {data: {userId: user}});
        dispatch(deletePost())
    } catch (error) {
        console.log(error)
    }
}*/

//Get all posts
export const allPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

//Get all users posts
export const usersPosts = (posts) => ({
    type: GET_USERS_POSTS,
    payload: posts
});

export const getAllPosts = async (posts, dispatch) => {
    try {
        const response = await axios.get('api/posts/timeline/' + posts);
        dispatch(allPosts(response.data));
    } catch (error) {
        console.log(error)
    }
};

export const getUsersPosts = async (posts, dispatch) => {
    try {
        const response = await axios.get('api/posts/profile/' + posts);
        dispatch(usersPosts(response.data));
    } catch (error) {
        console.log(error)
    }
};