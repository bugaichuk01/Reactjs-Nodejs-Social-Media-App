import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import style from './ProfileSection.module.css';
import cn from "classnames";
import {useSelector} from "react-redux";
import API from "../../../utils/API";

function ProfileSection() {
    const navigate = useNavigate();

    const {user: currentUser} = useSelector(state => state.userReducer);
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUser(currentUser.username)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [currentUser.username]);


    return (
        <div className={style.sidebar__profile}>
            <div className={style.sidebar__info}>
                <img className={style.sidebar__cover}
                     src={user.coverPicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.coverPicture : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultCover.png'}
                     alt=""/>
                <img onClick={() => navigate(`/${user.username}`)} className={cn(style.sidebar__avatar)}
                     src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'}
                     alt=""/>
            </div>

            <span className={style.sidebar__username}>{user.username}</span>
            <span className={style.sidebar__desc}>{user.desc}</span>

            <span className={style.sidebar__hr_horizontal}/>

            <div className={style.sidebar__social}>
                <div className={style.sidebar__followers}>
                    {user.followers && (
                        <span className={style.sidebar__social_nums}>{user.followers.length}</span>
                    )}
                    <span className={style.sidebar__social_text}>Followers</span>
                </div>

                <span className={style.sidebar__hr_vertical}/>

                <div className={style.sidebar__followings}>
                    {user.followings && (
                        <span className={style.sidebar__social_nums}>{user.followings.length}</span>
                    )}
                    <span className={style.sidebar__social_text}>Followings</span>
                </div>
            </div>

            <span className={style.sidebar__hr_horizontal}/>

            <span onClick={() => navigate(`/${currentUser.username}`)}
                  className={style.sidebar__link}>My profile</span>

        </div>
    );
}

export default ProfileSection;