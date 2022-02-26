import axios from "axios";

export default {
    //users
    getUser: async (userData) => await axios.get(`api/users?username=${userData}`),
    getUserById: async (userData) => await axios.get(`api/users?userId=${userData}`),
    getFollowings: async (userData) => await axios.get(`api/users/followings/${userData}`),
    getFollowers: async (userData) => await axios.get(`api/users/followers/${userData}`),
}