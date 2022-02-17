import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./Home.css"

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="home__container">
                <Sidebar />
                <Feed/>
                <RightBar/>
            </div>
        </>
    );
}

export default Home;