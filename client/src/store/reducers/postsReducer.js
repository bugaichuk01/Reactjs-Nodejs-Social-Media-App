import {GET_ALL_POSTS, GET_USERS_POSTS, DELETE_POST, UPDATE_LIKES} from "../constants/actionTypes";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_USERS_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post.likes.includes(action.payload) ? post : { ...post, likes: action.payload }
                ),
                loading: false,
            };
        default:
            return state;
    }
}
