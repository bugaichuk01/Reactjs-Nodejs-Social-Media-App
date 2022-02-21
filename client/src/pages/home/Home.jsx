import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./Home.css"

const Home = ({user}) => {
    return (
        <>
            <Topbar />
            <div className="home__container">
                <Sidebar user={user} />
                <Feed/>
                <RightBar user={user}/>
            </div>
        </>
    );
}

export default Home;