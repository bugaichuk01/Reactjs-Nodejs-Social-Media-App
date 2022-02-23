import "./Login.css";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import API from "../../API";

const Login = () => {
    const user = useSelector(state => state);
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.login({email: email.current.value, password: password.current.value}, dispatch)
            .catch(error => console.log(error));
    }

    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__left">
                    <h3 className="login__logo">Lamasocial</h3>
                    <span className="login__desc">
            Connect with friends and the world around you on Lamasocial.
          </span>
                </div>
                <div className="login__right">
                    <form className='login__box' onSubmit={handleSubmit}>
                        <input
                            placeholder="Email"
                            type='email'
                            className="login__input"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type='password'
                            className="login__input"
                            ref={password}
                            minLength={6}
                        />
                        <button disabled={user.isFetching} className="login__button">
                            {user.isFetching ? <CircularProgress size='25px' color='white' /> : 'Log in'}
                        </button>
                        <span className="login__forgot">Forgot Password?</span>
                        <button disabled={user.isFetching} className="login__register-button">
                            {user.isFetching ? <CircularProgress size='25px' color='white' /> : 'zNot registered yet?'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;