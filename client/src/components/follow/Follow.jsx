import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './Follow.css';
import API from '../../utils/API'

function Follow({user}) {

    const dispatch = useDispatch();
    const [followed, setFollowed] = useState(false);
    const {user: currentUser} = useSelector(state => state);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user, currentUser.followings]);

    const handleClick = () => {
        if (followed) {
            API.unfollowUser(user._id, {userId: currentUser._id}, dispatch)
                .catch(error => console.log(error));
        } else {
            API.followUser(user._id, {userId: currentUser._id}, dispatch)
                .catch(error => console.log(error));
        }
        setFollowed(!followed);
    }


return (
    <button className="follow__button" onClick={handleClick}>
        {followed ? 'Unfollow' : 'Follow'}
    </button>
);
}

export default Follow;
