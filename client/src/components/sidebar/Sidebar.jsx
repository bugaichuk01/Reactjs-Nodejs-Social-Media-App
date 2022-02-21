import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CloseFriend from "../closeFriend/CloseFriend";
import style from "./Sidebar.module.css";
import cn from 'classnames';

export default function Sidebar({user}) {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followers, setFollowers] = useState([]);
    const [clippedFollowers, setClippedFollowers] = useState([]);
    const [isFullFollowers, setIsFullFollowers] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getFollowers = async () => {
            const followers = await axios.get(`api/users/followers/${user._id}`);
            setFollowers(followers.data);
            followers.data.length > 3 ? setClippedFollowers(followers.data.slice(0, 3)) : setClippedFollowers(followers.data);
        }
        getFollowers();
    }, [user])


    const handleClick = () => {
        setIsFullFollowers(!isFullFollowers);
        isFullFollowers ? setClippedFollowers(followers.slice(0, 3)) : setClippedFollowers(followers);
    }

    return (
        <div className={style.sidebar}>
            <div className={style.sidebar__wrapper}>
                <div className={style.sidebar__profile}>
                    <div className={style.sidebar__info}>
                        <img className={style.sidebar__cover}
                             src={user.coverPicture ? _path + user.coverPicture : _path + 'person/defaultCover.png'}
                             alt=""/>
                        <img onClick={() => navigate(`/${user.username}`)} className={cn(style.sidebar__avatar)}
                             src={user.profilePicture ? _path + user.profilePicture : _path + 'person/defaultAvatar.png'}
                             alt=""/>
                    </div>

                    <span className={style.sidebar__username}>{user.username}</span>
                    <span className={style.sidebar__desc}>{user.desc}</span>

                    <span className={style.sidebar__hr_horizontal}/>

                    <div className={style.sidebar__social}>
                        <div className={style.sidebar__followers}>
                            {user.followers && (
                                <span className={style.sidebar__social_nums}>{user.followers.length}</span>
                            )}
                            <span className={style.sidebar__social_text}>Followers</span>
                        </div>

                        <span className={style.sidebar__hr_vertical}/>

                        <div className={style.sidebar__followings}>
                            {user.followings && (
                                <span className={style.sidebar__social_nums}>{user.followings.length}</span>
                            )}
                            <span className={style.sidebar__social_text}>Followings</span>
                        </div>
                    </div>

                    <span className={style.sidebar__hr_horizontal}/>

                    <span onClick={() => navigate(`/${user.username}`)}
                          className={style.sidebar__link}>My profile</span>

                </div>

                <div className={style.sidebar__followers_only}>
                    <span className={style.sidebar__text}>Who is to follow you</span>
                    {clippedFollowers && (
                        <ul className={style.sidebar__friend_list}>
                            {clippedFollowers.map((follower) => (
                                <CloseFriend key={follower._id} user={follower}/>
                            ))}
                        </ul>
                    )} {followers.length > 3 && (
                    <span
                        className={style.sidebar__link}
                        onClick={handleClick}>
                        {
                            isFullFollowers
                                ? 'Hide'
                                : 'Show more'
                        }</span>
                )}
                </div>
            </div>
        </div>
    );
}
