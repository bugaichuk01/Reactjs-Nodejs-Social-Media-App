import "./CloseFriend.css";

const CloseFriend = ({user}) => {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="sidebar__friend">
            <img className="sidebar__friend-img" src={_path + user.profilePicture} alt=""/>
            <span className="sidebar__friend-name">{user.username}</span>
        </li>
    );
}

export default CloseFriend;
