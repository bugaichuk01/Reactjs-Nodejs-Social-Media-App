import React from 'react';
import style from "./ProfileDesign.module.css";

function ProfileDesign({user}) {
    return (
        <div className={style.profile__cover}>
            <img
                className={style.profile__cover_img}
                src={user.coverPicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.coverPicture : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultCover.png'}
                alt=""
            />
            <img
                className={style.profile__user_img}
                src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'}
                alt=""
            />
        </div>
    );
}

export default ProfileDesign;