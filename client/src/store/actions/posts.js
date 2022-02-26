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

export const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

export const getUsersPosts = (posts) => ({
    type: GET_USERS_POSTS,
    payload: posts
});

