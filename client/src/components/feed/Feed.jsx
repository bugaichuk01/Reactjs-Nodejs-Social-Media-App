import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Post from "../post/Post";
import Share from "../Share/Share";
import style from "./Feed.module.css";
import API from "../../utils/API";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);
    const {user: currentUser} = useSelector(state => state.userReducer);

    useEffect(() => {
        API.getPosts(username, currentUser._id)
            .then(response => setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
            .catch(error => console.log(error));
    }, [username, currentUser._id]);

    return (
        <div className={style.feed}>
            <div className={style.feed__wrapper}>
                {(!username || (username === currentUser.username)) && (
                    <Share/>
                )}
                {posts.map((post) => (
                    <Post key={post._id} post={post}/>
                ))}
            </div>
        </div>
    );
}

export default Feed;