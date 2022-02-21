import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Profile = () => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const {user: currentUser} = useSelector(state => state);
    const params = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users?username=${params}`);
            setUser(response.data);
        }
        fetchUser();
    }, [params])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar user={currentUser}/>
                <div className="profile__right">
                    <div className="profile__right-top">
                        <div className="profile__cover">
                            <img
                                className="profile__cover-img"
                                src={user.coverPicture ? _path + user.coverPicture : _path + 'person/defaultCover.png'}
                                alt=""
                            />
                            <img
                                className="profile__user-img"
                                src={user.profilePicture ? _path + user.profilePicture : _path + 'person/defaultAvatar.png'}
                                alt=""
                            />
                        </div>
                        <div className="profile__info">
                            <h4 className="profile__info-name">{user.username}</h4>
                            <span className="profile__info-desc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profile__right-button">
                        <Feed username={params}/>
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;