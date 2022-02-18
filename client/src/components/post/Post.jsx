import "./Post.css";
import {Favorite, MoreVert, ThumbUp} from "@material-ui/icons"
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from 'timeago.js';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Post({post}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useSelector(state => state);

    const [like, setLike] = useState(post.likes.length);

    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [description, setDescription] = useState('');
    const [isFullDesc, setIsFullDesc] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users?userId=${post.userId}`);
            setUser(response.data);
        }
        fetchUser();

        post.desc.length > 100 ? setDescription(post.desc.slice(0, 100) + '...') : setDescription(post.desc);
    }, [post.userId]);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    const likeHandler = () => {
        try {
            axios.put('api/posts/' + post._id + '/like', {userId: currentUser._id});
        } catch (error) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    const handleDescription = () => {
        setDescription(post.desc);
        setIsFullDesc(true);
    }

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <Link to={`${user.username}`}>
                            <img
                                className="post__profile-img"
                                src={
                                    user.profilePicture
                                        ? _path + user.profilePicture
                                        : _path + 'person/defaultAvatar.png'
                                }
                                alt=""
                            />
                        </Link>
                        <span className="post__username">
              {user.username}
            </span>
                    </div>
                    <div className="post__top-right">
                        <MoreVert/>
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__date">{format(post.createdAt)}</span>
                    <span className="post__text">{description}</span>
                    {
                        description.length > 100
                            ? <span style={{display: isFullDesc ? 'none' : 'block'}}
                                    onClick={handleDescription} className="post__text-full">Read more...</span>
                            : null
                    }
                    <img className="post__img" src={_path + post.img} alt=""/>
                    <span className="post__text-likes">{like} people like it</span>
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <div style={{backgroundColor: isLiked ? "white" : "#28343e"}} className="post__option"
                             onClick={likeHandler}>
                            <ThumbUp style={{color: isLiked ? "#1da1f2" : "#fff"}} fontSize={"small"}
                                     className="post__icon-like"/>
                            <span style={{color: isLiked ? "#06141d" : "#fff"}}
                                  className="post__option-text">Like</span>
                        </div>
                    </div>
                    <div className="post__bottom-right">
                        <span className="post__comment-text">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
