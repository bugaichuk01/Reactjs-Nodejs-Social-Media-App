import {GET_ALL_POSTS, GET_USERS_POSTS} from "../constants/actionTypes";

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
                loading: false,
            };
        case GET_USERS_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        /*case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(posts._id !== payload)
            };*/
        default:
            return state;
    }
}
