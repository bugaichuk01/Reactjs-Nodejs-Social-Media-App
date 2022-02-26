import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const App = () => {

    const {user: currentUser} = useSelector(state => state.userReducer);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={currentUser ? <Home user={currentUser}/> : <Login/>}/>
                <Route path="/login" element={currentUser ? <Navigate replace to='/'/> : <Login/>}/>
                <Route path="/register" element={currentUser ? <Navigate replace to='/'/> : <Register/>}/>
                <Route path="/:username" element={currentUser ? <Profile/> : <Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;