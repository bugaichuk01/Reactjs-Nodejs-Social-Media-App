import React, {useEffect, useState} from 'react';
import style from './FollowersSection.module.css';
import CloseFriend from "../../closeFriend/CloseFriend";
import {useSelector} from "react-redux";
import FollowersLoader from "../../../loaders/FollowersLoader";
import API from "../../../utils/API";

function FollowersSection() {
    const [followers, setFollowers] = useState([]);
    const [clippedFollowers, setClippedFollowers] = useState([]);
    const [isFullFollowers, setIsFullFollowers] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {user: currentUser} = useSelector(state => state.userReducer);
    const {_id} = currentUser;


    useEffect(() => {
        API.getFollowers(_id)
            .then(response => setFollowers(response.data))
            .catch(error => console.log(error));
    }, [currentUser])

    useEffect(() => {
        followers.length > 3 ? setClippedFollowers(followers.slice(0, 3)) : setClippedFollowers(followers);
    }, [followers])

    //Example to see how works skeleton-screen components
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const toggleShow = () => {
        setIsFullFollowers(!isFullFollowers);
        isFullFollowers ? setClippedFollowers(followers.slice(0, 3)) : setClippedFollowers(followers);
    }

    return (
        <div className={style.followers}>
            <div className={style.followers__wrapper}>
                {isLoading
                    ? <FollowersLoader/>
                    : (
                        <React.Fragment>
                            <span className={style.followers__text}>Who is to follow you</span>
                            <ul className={style.followers__list}>
                                {clippedFollowers.map((follower) => (
                                    <CloseFriend key={follower._id} follower={follower}/>
                                ))}
                            </ul>
                        </React.Fragment>
                    )}
                {followers.length > 3 && (
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
        </div>
    );
}

export default FollowersSection;