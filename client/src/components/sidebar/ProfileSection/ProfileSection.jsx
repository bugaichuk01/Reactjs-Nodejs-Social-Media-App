import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import style from './ProfileSection.module.css';
import cn from "classnames";
import {useSelector} from "react-redux";
import {useGetRequest} from "../../../useApi";

function ProfileSection() {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();

    const {user: currentUser} = useSelector(state => state);
    const user = useGetRequest(`api/users?userId=${currentUser._id}`, currentUser._id)

    return (
        <div className={style.sidebar__profile}>
            <div className={style.sidebar__info}>
                <img className={style.sidebar__cover}
                     src={user.coverPicture ? _path + user.coverPicture : _path + 'person/defaultCover.png'}
                     alt=""/>
                <img onClick={() => navigate(`/${user.username}`)} className={cn(style.sidebar__avatar)}
                     src={user.profilePicture ? _path + user.profilePicture : _path + 'person/defaultAvatar.png'}
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