import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import {useEffect, useState} from "react";
import axios from "axios";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = username
            ? await axios.get('api/posts/profile/' + username)
            : await axios.get('api/posts/timeline/620e1ccc77c3b939d4a338f9');
            setPosts(response.data);
        }
        fetchPosts();
    }, [username])

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