import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Post from "../post/Post";
import Share from "../Share/Share";
import style from "./Feed.module.css";
import {ScaleLoader} from "react-spinners";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);
    const {user} = useSelector(state => state);
    console.log(user.username, username)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = username
                ? await axios.get('api/posts/profile/' + username)
                : await axios.get('api/posts/timeline/' + user._id);
            setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
        fetchPosts();
    }, [username, user._id])

    return (
        <div className={style.feed}>
            <div className={style.feed__wrapper}>
                {(!username || (username === user.username)) && (
                    <Share/>
                )
                }
                {posts.map((post) => (
                    <Post key={post._id} post={post}/>
                ))}
            </div>
        </div>
    );
}

export default Feed;