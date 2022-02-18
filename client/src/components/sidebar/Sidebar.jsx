import "./Sidebar.css";
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from "@material-ui/icons";
import {Users} from "../../Data.js";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <ul className="sidebar__list">
                    <li className="sidebar__list-item">
                        <RssFeed htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Feed</span>
                    </li>
                    <li className="sidebar__list-item">
                        <Chat htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Chats</span>
                    </li>
                    <li className="sidebar__list-item">
                        <PlayCircleFilledOutlined htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Videos</span>
                    </li>
                    <li className="sidebar__list-item">
                        <Group htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Groups</span>
                    </li>
                    <li className="sidebar__list-item">
                        <Bookmark htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Bookmarks</span>
                    </li>
                    <li className="sidebar__list-item">
                        <HelpOutline htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Questions</span>
                    </li>
                    <li className="sidebar__list-item">
                        <WorkOutline htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Jobs</span>
                    </li>
                    <li className="sidebar__list-item">
                        <Event htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Events</span>
                    </li>
                    <li className="sidebar__list-item">
                        <School htmlColor={'#fff'} className="sidebar__icon"/>
                        <span className="sidebar__list-item-text">Courses</span>
                    </li>
                </ul>
                <ul className="sidebar__friend-list">
{/*                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}*/}
                </ul>
            </div>
        </div>
    );
}
