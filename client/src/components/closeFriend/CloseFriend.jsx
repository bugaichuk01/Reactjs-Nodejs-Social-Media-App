import style from "./CloseFriend.module.css";
import Follow from "../follow/Follow";
import {Link} from "react-router-dom";

const CloseFriend = ({user}) => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className={style.followers}>
            <Link to={`/${user.username}`} className={style.follower}>
                <img
                    className={style.follower__avatar}
                    src={user.profilePicture ? _path + user.profilePicture : _path + 'person/defaultAvatar.png'}
                    alt={user.username}
                />
                <span className={style.follower__name}>{user.username}</span>
            </Link>
            <Follow user={user} />
        </li>
    );
}

export default CloseFriend;
