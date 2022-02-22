import styles from "./Profile.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetRequest} from "../../useApi";
import ProfileDesign from "./ProfileDesign/ProfileDesign";

const Profile = () => {
    const {user: currentUser} = useSelector(state => state);
    const params = useParams().username;

    const user = useGetRequest(`api/users?username=${params}`, params)

    return (
        <>
            <Header/>
            <ProfileDesign user={user} />
            <div className={styles.profile}>
                <Sidebar/>
                <Feed username={params} currentUser={currentUser}/>
                <RightBar user={user}/>
            </div>
        </>
    );
}

export default Profile;