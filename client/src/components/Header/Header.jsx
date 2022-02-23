import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Search, Twitter, HomeRounded} from "@material-ui/icons";
import style from "./Header.module.css";
import cn from "classnames";
import {useEffect, useState} from "react";
import API from "../../utils/API";

const Header = () => {
    const location = useLocation();
    const {user: currentUser} = useSelector(state => state);
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUser(currentUser.username)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <header className={style.header}>
            <div className={style.header__left}>
                <Link to="/">
                    <Twitter className={style.logo}/>
                </Link>
                <div className={style.search}>
                    <Search className={style.search__icon}/>
                    <input
                        placeholder="Explore..."
                        className={style.input}
                    />
                </div>
            </div>
            <div className={style.header__right}>
                <Link
                    to='/'
                    className={
                        location.pathname === '/'
                            ? cn(style.link, style.header__link, style.link__active)
                            : cn(style.link, style.header__link, style.link__disabled)}>
                    <HomeRounded className={
                        location.pathname === '/'
                            ? cn(style.link__icon, style.link__icon_active)
                            : cn(style.link__icon, style.link__icon_disabled)
                    }  />
                    <span
                        className={
                            location.pathname === '/'
                                ? cn(style.link__text, style.link__text_active)
                                : cn(style.link__text, style.link__text_disabled)
                        }>
                        Home
                    </span>
                </Link>
                <div className={style.header__profile}>
                    <Link to={`/${user.username}`} className={style.link}>
                        <img
                            src={
                                user.profilePicture
                                    ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                                    : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'
                            }
                            alt={user.username}
                            className={style.header__avatar}
                        />
                        <span className={style.header__username}>{user.username}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;