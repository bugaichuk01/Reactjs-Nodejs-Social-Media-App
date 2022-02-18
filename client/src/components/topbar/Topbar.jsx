import "./Topbar.css";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Topbar = () => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useSelector(state => state);

    return (
        <div className="topbar__container">
            <div className="topbar__left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="topbar__logo">Social App</span>
                </Link>
            </div>
            <div className="topbar__center">
                <div className="topbar__search">
                    <Search htmlColor={'#fff'} className="topbar__search-icon"/>
                    <input
                        placeholder="Search for friend, post or video"
                        className="topbar__search-input"
                    />
                </div>
            </div>
            <div className="topbar__right">
                <div className="topbar__links">
                    <span className="topbar__link">Homepage</span>
                    <span className="topbar__link">Timeline</span>
                </div>
                <div className="topbar__icons">
                    <div className="topbar__icon-item">
                        <Person/>
                    </div>
                    <div className="topbar__icon-item">
                        <Chat/>
                    </div>
                    <div className="topbar__icon-item">
                        <Notifications/>
                    </div>
                </div>
                <Link to={`/${user.username}`}>
                    <img
                        src={user.profilePicture
                            ? _path + user.profilePicture
                            : _path + 'person/defaultAvatar.png'}
                        alt=""
                        className="topbar__img"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Topbar;