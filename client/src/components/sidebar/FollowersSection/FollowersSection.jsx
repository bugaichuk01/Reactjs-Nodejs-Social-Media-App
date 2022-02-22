import React, {useEffect, useState} from 'react';
import style from './FollowersSection.module.css';
import CloseFriend from "../../closeFriend/CloseFriend";
import {useGetRequest} from "../../../useApi";
import {useSelector} from "react-redux";

function FollowersSection() {
    const [clippedFollowers, setClippedFollowers] = useState([]);
    const [isFullFollowers, setIsFullFollowers] = useState(false);

    const {user: currentUser} = useSelector(state => state);
    const {_id} = currentUser;

    const followers = useGetRequest(`api/users/followers/${_id}`, currentUser);

    useEffect(() => {
        followers.length > 3 ? setClippedFollowers(followers.slice(0, 3)) : setClippedFollowers(followers);
    }, [followers])

    const toggleShow = () => {
        setIsFullFollowers(!isFullFollowers);
        isFullFollowers ? setClippedFollowers(followers.slice(0, 3)) : setClippedFollowers(followers);
    }

    return (
        <div className={style.sidebar__followers}>
            <span className={style.sidebar__text}>Who is to follow you</span>
            {clippedFollowers && (
                <ul className={style.sidebar__friend_list}>
                    {clippedFollowers.map((follower) => (
                        <CloseFriend key={follower._id} follower={follower}/>
                    ))}
                </ul>
            )} {followers.length > 3 && (
            <span
                className={style.sidebar__link}
                onClick={toggleShow}>
                        {
                            isFullFollowers
                                ? 'Hide'
                                : 'Show more'
                        }</span>
        )}
        </div>
    );
}

export default FollowersSection;