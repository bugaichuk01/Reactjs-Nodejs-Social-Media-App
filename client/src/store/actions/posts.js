import {DELETE_POST, GET_ALL_POSTS, GET_USERS_POSTS, UPDATE_LIKES} from "../constants/actionTypes";

export const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

export const getUsersPosts = (posts) => ({
    type: GET_USERS_POSTS,
    payload: posts
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    payload: id
});

export const updateLikes = (id) => ({
    type: UPDATE_LIKES,
    payload: id
})