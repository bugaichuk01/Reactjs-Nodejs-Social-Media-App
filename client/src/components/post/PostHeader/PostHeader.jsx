import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {MoreVert} from "@material-ui/icons";
import {Menu, MenuItem} from "@material-ui/core";
import style from "./PostHeader.module.css";
import API from "../../../utils/API";

function PostHeader({post}) {
    const {user: currentUser} = useSelector(state => state);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUserById(post.userId)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [post.userId]);

    const optionsHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteHandler = async () => {
        try {
            await axios.delete(`api/posts/${post._id}`, {data: {userId: currentUser._id}});
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
        setAnchorEl(null);
    }

    return (
        <div className={style.post__header}>
            <div className={style.post__header_author}>
                <Link to={`${user.username}`}>
                    <img
                        className={style.post__avatar}
                        src={
                            user.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                                : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'
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
    );
}

export default PostHeader;