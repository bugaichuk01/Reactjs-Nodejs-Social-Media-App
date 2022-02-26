import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../post/Post";
import Share from "../Share/Share";
import style from "./Feed.module.css";
import {getAllPosts, getUsersPosts} from "../../store/actions/posts";

const Feed = ({username}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userReducer);
    const {posts} = useSelector(state => state.postsReducer);

    useEffect(() => {
        ((user.username === username) || !username)
            ? getAllPosts(user._id, dispatch)
            : getUsersPosts(username, dispatch);
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