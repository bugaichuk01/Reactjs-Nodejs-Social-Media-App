import Header from "../../components/Header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import styles from "./Home.module.css"

const Home = ({user}) => {
    return (
        <>
            <Header />
            <div className={styles.home__container}>
                <Sidebar/>
                <Feed />
                <RightBar user={user}/>
            </div>
        </>
    );
}

export default Home;