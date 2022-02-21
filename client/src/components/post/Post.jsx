import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {format} from 'timeago.js';
import axios from "axios";
import {
    AutorenewRounded,
    CommentRounded,
    LoyaltyRounded,
    MoreVert, PublishRounded, SaveAltRounded,
    ThumbUp
} from "@material-ui/icons"
import cn from 'classnames';
import style from "./Post.module.css";
import {MenuItem, Menu} from "@material-ui/core";


export default function Post({post}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useSelector(state => state);

    const [user, setUser] = useState({});

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const [description, setDescription] = useState('');
    const [isFullDesc, setIsFullDesc] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
    }, [currentUser._id]);

    const likeHandler = () => {
        try {
            axios.put('api/posts/' + post._id + '/like', {userId: currentUser._id});
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    const descriptionHandler = () => {
        setDescription(post.desc);
        setIsFullDesc(true);
    }

    const optionsHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteHandler = () => {
        try {
            axios.delete(`api/posts/${post._id}`, {data: {userId: currentUser._id}});
        } catch (error) {
            console.log(error)
        }
        setAnchorEl(null);
    }

    return (
        <div className={style.post}>
            <div className={style.post__wrapper}>
                <div className={style.post__header}>
                    <div className={style.post__header_author}>
                        <Link to={`${user.username}`}>
                            <img
                                className={style.post__avatar}
                                src={
                                    user.profilePicture
                                        ? _path + user.profilePicture
                                        : _path + 'person/defaultAvatar.png'
                                }
                                alt={user.username}
                            />
                        </Link>
                        <div className={style.post__info}>
                            <span className={style.post__username}>{user.username}</span>
                            <span className={style.post__date}>{format(post.createdAt)}</span>
                        </div>
                    </div>

                    <div className={style.post__header_options}>
                        <div>
                            {user._id === currentUser._id && (
                                <MoreVert
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={optionsHandler}/>
                            )}
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button'
                                }}
                            >
                                <MenuItem onClick={deleteHandler}>Delete Post</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className={style.post__container}>
                    <span className={style.post__body}>{description}</span>
                    {
                        description.length > 100 && (
                            <span
                                className={
                                    isFullDesc
                                        ? cn(style.post__body_full, style.full__active)
                                        : cn(style.post__body_full, style.full__disabled)
                                }
                                onClick={descriptionHandler}>Read more...
                            </span>
                        )
                    }
                    <img className={style.post__img} src={_path + post.img} alt=""/>
                    <div className={style.post__under}>
                        <div className={style.icons}>
                            <LoyaltyRounded className={cn(style.icon, style.heart__icon)}/>
                            <AutorenewRounded className={cn(style.icon, style.retweet__icon)}/>
                            <PublishRounded className={cn(style.icon, style.share__icon)}/>
                            <span className={style.post__likes}>{like}</span>
                        </div>
                        <div>
                            <span className={style.post__comments_text}>{post.comment} comments</span>
                        </div>
                    </div>
                </div>
                <div className={style.post__footer}>
                    <div className={style.post__actions}>
                        <div
                            className={
                                isLiked
                                    ? cn(style.post__action, style.post__action_active)
                                    : cn(style.post__action, style.post__action_disabled)
                            }
                            onClick={likeHandler}
                        >
                            <ThumbUp
                                className={
                                    isLiked
                                        ? cn(style.post__icon_like, style.like__active)
                                        : cn(style.post__icon_like, style.like__disabled)
                                }
                            />
                            <span
                                className={
                                    isLiked
                                        ? cn(style.post__action_text, style.action__text_active)
                                        : cn(style.post__action_text, style.action__text_disabled)
                                }
                            >Like</span>
                        </div>
                        <div className={cn(style.post__action, style.post__action_disabled)}>
                            <AutorenewRounded className={style.post__icon_like}/>
                            <span className={style.post__action_text}>Retweet</span>
                        </div>
                        <div className={cn(style.post__action, style.post__action_disabled)}>
                            <CommentRounded className={style.post__icon_like}/>
                            <span className={style.post__action_text}>Comment</span>
                        </div>
                        <div className={style.post__action_last}>
                            <PublishRounded />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
