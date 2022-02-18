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

    const {user} = useSelector(state => state);

    useEffect(() => {
        localStorage.setItem('user.user', JSON.stringify(user));
    }, [user]);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={user ? <Home user={user}/> : <Login/>}/>
                <Route path="/login" element={user ? <Navigate replace to='/'/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate replace to='/'/> : <Register/>}/>
                <Route path="/:username" element={<Profile/>}/>
            </Routes>
        </Router>
    );
}

export default App;