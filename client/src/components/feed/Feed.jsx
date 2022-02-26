import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../post/Post";
import Share from "../Share/Share";
import style from "./Feed.module.css";
import API from "../../utils/API";

const Feed = ({username}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userReducer);
    const {posts} = useSelector(state => state.postsReducer);

    useEffect(() => {
        !username
            ? API.getAllPosts(user._id, dispatch)
            : API.getUsersPosts(username, dispatch);
    }, [username, user]);

    return (
        <div className={style.feed}>
            <div className={style.feed__wrapper}>
                {(!username || (username === user.username)) && (
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