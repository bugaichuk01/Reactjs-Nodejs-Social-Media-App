import "./RightBar.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Follow from "../follow/Follow";

export default function RightBar({user}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useSelector(state => state);
    const [friends, setFriends] = useState([]);


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


    return (
        <div className='right-bar__container'>
            <div className="right-bar">
                <div className="rightbar__wrapper">
                    {user.username !== currentUser.username && (
                        <Follow user={user} />
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
