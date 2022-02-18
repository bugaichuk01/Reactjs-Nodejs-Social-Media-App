import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);
    const {user} = useSelector(state => state);

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
        <div className="feed">
            <div className="feed__wrapper">
                <Share/>
                {posts && (
                    posts.map((post) => (
                        <Post key={post._id} post={post}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default Feed;