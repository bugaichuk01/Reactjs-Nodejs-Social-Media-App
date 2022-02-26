import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './Follow.css';
import {followUser, unfollowUser} from "../../store/actions/user";

function Follow({user}) {

    const dispatch = useDispatch();
    const [followed, setFollowed] = useState(false);
    const {user: currentUser} = useSelector(state => state.userReducer);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user, currentUser.followings]);

    const handleClick = () => {
        if (followed) {
            unfollowUser(user._id, {userId: currentUser._id}, dispatch)
                .catch(error => console.log(error));
        } else {
            followUser(user._id, {userId: currentUser._id}, dispatch)
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
