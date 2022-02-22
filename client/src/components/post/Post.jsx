import {useState} from "react";
import style from "./Post.module.css";
import PostActions from "./PostActions/PostActions";
import PostHeader from "./PostHeader/PostHeader";
import PostBody from "./PostBody/PostBody";


export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);

    return (
        <div className={style.post}>
            <div className={style.post__wrapper}>
                <PostHeader post={post}/>
                <PostBody post={post} like={like} />
                <PostActions post={post} like={like} setLike={setLike}/>
            </div>
        </div>
    );
}
