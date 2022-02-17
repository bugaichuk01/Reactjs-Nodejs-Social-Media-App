import "./Post.css";
import {MoreVert} from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from 'timeago.js';
import {Link} from "react-router-dom";

export default function Post({post}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users?userId=${post.userId}`);
            setUser(response.data);
        }
        fetchUser();
    }, [post.userId])

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <Link to={`${user.username}`}>
                            <img
                                className="post__profile-img"
                                src={user.profilePicture || _path + 'person/defaultAvatar.png'}
                                alt=""
                            />
                        </Link>
                        <span className="post__username">
              {user.username}
            </span>
                        <span className="post__date">{format(post.createdAt)}</span>
                    </div>
                    <div className="post__top-right">
                        <MoreVert/>
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__text">{post?.desc}</span>
                    <img className="post__img" src={_path + post.img} alt=""/>
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <img className="like__icon" src="assets/like.png" onClick={likeHandler} alt=""/>
                        <img className="like__icon" src="assets/heart.png" onClick={likeHandler} alt=""/>
                        <span className="like__icon-counter">{like} people like it</span>
                    </div>
                    <div className="post__bottom-right">
                        <span className="post__comment-text">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
