import React from 'react'
import styles from "./Profile.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import {useParams} from "react-router-dom";
import ProfileDesign from "./ProfileDesign/ProfileDesign";
import {useEffect, useState} from "react";
import API from "../../utils/API";

const Profile = () => {
    const [user, setUser] = useState({});
    const params = useParams().username;

    useEffect(() => {
        API.getUser(params)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [params]);

    return (
        <React.Fragment>
            <Header/>
            <ProfileDesign user={user}/>
            <div className={styles.profile}>
                <Sidebar/>
                <Feed username={params}/>
                <RightBar user={user}/>
            </div>
        </React.Fragment>
    );
}

export default Profile;