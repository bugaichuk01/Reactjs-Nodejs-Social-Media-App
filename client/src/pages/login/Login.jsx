import "./Login.css";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import API from "../../utils/API";

const Login = () => {
    const {isFetching} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onChange = (event) =>
        setFormData({...formData, [event.target.name]: event.target.value})

    const onSubmit = (event) => {
        event.preventDefault();
        API.login(email, password, dispatch);
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
                    <form className='login__box' onSubmit={onSubmit}>
                        <input
                            placeholder="Email"
                            type='email'
                            name='email'
                            className="login__input"
                            onChange={onChange}
                        />
                        <input
                            placeholder="Password"
                            type='password'
                            name='password'
                            className="login__input"
                            minLength='6'
                            onChange={onChange}
                        />
                        <button disabled={isFetching} className="login__button">
                            {isFetching ? <CircularProgress size='25px' color='white' /> : 'Log in'}
                        </button>
                        <span className="login__forgot">Forgot Password?</span>
                        <button disabled={isFetching} className="login__register-button">
                            {isFetching ? <CircularProgress size='25px' color='white' /> : 'zNot registered yet?'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;