import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../css/SigninScreen.css';
import { useHistory } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen({ location }) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    console.log(location);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const signinHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png" alt="logo" />
            </Link>

            <div className="login__container">
                <h1 className="font-baloo">Đăng nhập</h1>

                <form>
                    {loading ? <LoadingBox></LoadingBox> : error && <MessageBox>{error}</MessageBox>}
                    <h5 className="font-baloo font-size-20">Email: </h5>
                    <input type="email" required onChange={e => setEmail(e.target.value)} />

                    <h5 className="font-baloo font-size-20">Mật khẩu: </h5>
                    <input type="password" onChange={e => setPassword(e.target.value)} />

                    <button type="submit" className="login__signInButton" required onClick={signinHandler}>Đăng nhập</button>
                </form>

                <p>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button type="submit" className="login__registerButton" onClick={e => history.push(`/register?redirect=${redirect}`)}>Tạo tài khoản mới&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default SigninScreen
