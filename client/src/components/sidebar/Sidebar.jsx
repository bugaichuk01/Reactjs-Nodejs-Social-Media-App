import style from "./Sidebar.module.css";
import ProfileSection from "./ProfileSection/ProfileSection";
import FollowersSection from "./FollowersSection/FollowersSection";

export default function Sidebar() {
    return (
        <div className={style.sidebar}>
            <div className={style.sidebar__wrapper}>
                <ProfileSection />
                <FollowersSection />
            </div>
        </div>
    );
}
