import "./Register.css";
import {useRef} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwordConfirm.current.value !== password.current.value) {
            password.current.setCustomValidity('Passwords doesnt match');
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('api/auth/register', user);
                navigate('/login');
            } catch (error) {
                console.log(error)
            }
        }
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
                    <form className="login__box" onSubmit={handleSubmit}>
                        <input
                            ref={username}
                            required
                            placeholder="Username"
                            className="login__input"/>
                        <input
                            required
                            ref={email}
                            type='email'
                            placeholder="Email"
                            className="login__input"/>
                        <input
                            required
                            ref={password}
                            type='password'
                            placeholder="Password"
                            className="login__input"
                            minLength={6}/>
                        <input
                            required
                            ref={passwordConfirm}
                            type='password'
                            placeholder="Password Again"
                            className="login__input"/>
                        <button className="login__button" type="submit">Sign Up</button>
                        <button className="login__register-button">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;