import React from 'react';
import style from "./ProfileDesign.module.css";

function ProfileDesign({user}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={style.profile__cover}>
            <img
                className={style.profile__cover_img}
                src={user.coverPicture ? _path + user.coverPicture : _path + 'person/defaultCover.png'}
                alt=""
            />
            <img
                className={style.profile__user_img}
                src={user.profilePicture ? _path + user.profilePicture : _path + 'person/defaultAvatar.png'}
                alt=""
            />
        </div>
    );
}

export default ProfileDesign;