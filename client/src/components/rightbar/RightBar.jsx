import style from "./RightBar.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Follow from "../follow/Follow";
import API from "../../utils/API";

export default function RightBar({user}) {
    const {user: currentUser} = useSelector(state => state);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        API.getFollowings(user._id)
            .then(response => setFollowings(response.data))
            .catch(error => console.log(error));
    }, [currentUser.followings, user._id]);

    return (
        <div className={style.rightbar__container}>
            <div className={style.rightbar}>
                <div className={style.rightbar__wrapper}>
                    {user.username !== currentUser.username && (
                        <Follow user={user}/>
                    )}
                    <h4 className={style.rightbar__title}>User information</h4>
                    <div className={style.rightbar__info}>
                        <div className={style.rightbar__info_item}>
                            <span className={style.rightbar__info_key}>City:</span>
                            <span className={style.rightbar__info_value}>{user.city}</span>
                        </div>
                        <div className={style.rightbar__info_item}>
                            <span className={style.rightbar__info_key}>From:</span>
                            <span className={style.rightbar__info_value}>{user.from}</span>
                        </div>
                        <div className={style.rightbar__info_item}>
                            <span className={style.rightbar__info_key}>Relationship:</span>
                            <span className={style.rightbar__info_value}>
                            {user.relationship === 1
                                ? 'Single'
                                : user.relationship === 2
                                    ? 'Married'
                                    : '-'}
                        </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.rightbar}>
                <div className={style.rightbar__wrapper}>
                    <h4 className={style.rightbar__title}>User friends</h4>
                    <div className={style.rightbar__followings}>
                        {followings.map((friend) => (
                            <div key={friend._id} className={style.rightbar__following}>
                                <Link to={`/${friend.username}`}>
                                    <img
                                        src={friend.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + friend.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'}
                                        alt=""
                                        className={style.rightbar__following_img}
                                    />
                                </Link>
                                <span className={style.rightbar__following_name}>{friend.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
