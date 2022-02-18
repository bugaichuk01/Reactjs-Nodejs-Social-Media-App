import "./RightBar.css";
import Online from "../online/Online";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Add, Remove} from "@material-ui/icons";
import {follow, unfollow} from "../../store/actions";

export default function RightBar({user}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useSelector(state => state);
    const dispatch = useDispatch();

    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`api/users/friends/${user._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`api/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch(unfollow(user._id));
            } else {
                await axios.put(`api/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch(follow(user._id));
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    return (
        <div className='right-bar__container'>
            <div className="right-bar">
                <div className="rightbar__wrapper">
                    {user.username !== currentUser.username && (
                        <button className="rightbar__button-follow" onClick={handleClick}>
                            {followed ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                    <h4 className="rightbar__title">User information</h4>
                    <div className="rightbar__info">
                        <div className="rightbar__info-item">
                            <span className="rightbar__info-key">City:</span>
                            <span className="rightbar__info-value">{user.city}</span>
                        </div>
                        <div className="rightbar__info-item">
                            <span className="rightbar__info-key">From:</span>
                            <span className="rightbar__info-value">{user.from}</span>
                        </div>
                        <div className="rightbar__info-item">
                            <span className="rightbar__info-key">Relationship:</span>
                            <span className="rightbar__info-value">
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

            <div className="right-bar">
                <div className="rightbar__wrapper">
                    <h4 className="rightbar__title">User friends</h4>
                    <div className="rightbar__followings">
                        {friends.map((friend) => (
                            <div key={friend._id} className="rightbar__following">
                                <Link to={`/${friend.username}`}>
                                    <img
                                        src={friend.profilePicture ? _path + friend.profilePicture : _path + 'person/defaultAvatar.png'}
                                        alt=""
                                        className="rightbar__following-img"
                                    />
                                </Link>
                                <span className="rightbar__following-name">{friend.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
