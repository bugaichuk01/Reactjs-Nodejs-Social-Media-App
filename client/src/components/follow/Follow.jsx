import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {follow, unfollow} from "../../store/actions";
import axios from "axios";
import './Follow.css';

function Follow({user}) {

    const dispatch = useDispatch();
    const [followed, setFollowed] = useState(false);
    const {user: currentUser} = useSelector(state => state);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user, currentUser.followings]);

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
        <button className="follow__button" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
        </button>
    );
}

export default Follow;
