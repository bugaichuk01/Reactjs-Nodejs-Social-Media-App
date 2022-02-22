import style from "./CloseFriend.module.css";
import Follow from "../follow/Follow";
import {Link} from "react-router-dom";

const CloseFriend = ({follower}) => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className={style.followers}>
            <Link to={`/${follower.username}`} className={style.follower}>
                <img
                    className={style.follower__avatar}
                    src={follower.profilePicture ? _path + follower.profilePicture : _path + 'person/defaultAvatar.png'}
                    alt={follower.username}
                />
                <span className={style.follower__name}>{follower.username}</span>
            </Link>
            <Follow user={follower} />
        </li>
    );
}

export default CloseFriend;
