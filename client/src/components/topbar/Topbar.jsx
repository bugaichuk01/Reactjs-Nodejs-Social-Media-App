import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Search, Twitter, HomeRounded} from "@material-ui/icons";
import style from "./Topbar.module.css";
import cn from "classnames";

const Topbar = () => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useSelector(state => state);
    const location = useLocation();


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
                                    ? _path + user.profilePicture
                                    : _path + 'person/defaultAvatar.png'
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

export default Topbar;