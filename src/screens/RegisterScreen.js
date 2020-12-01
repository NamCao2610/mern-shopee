import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../css/SigninScreen.css';
import { useHistory } from 'react-router-dom';
import { register } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen({ location }) {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertError, setAlertError] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);

    const { userInfo, loading, error } = userRegister;

    const registerHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlertError('Mat khau nhap lai khong dung');
        } else {
            setAlertError('');
            dispatch(register(name, email, password));
        }
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
                <h1>Đăng Ký</h1>

                <form>
                    {loading ? <LoadingBox></LoadingBox> : error && <MessageBox>{error}</MessageBox>}
                    {alertError && <MessageBox>{alertError}</MessageBox>}
                    <h5>Tên người dùng: </h5>
                    <input type="text" required onChange={e => setName(e.target.value)} />

                    <h5>Email: </h5>
                    <input type="email" required onChange={e => setEmail(e.target.value)} />

                    <h5>Mật khẩu: </h5>
                    <input type="password" onChange={e => setPassword(e.target.value)} />

                    <h5>Nhập lại mật khẩu: </h5>
                    <input type="password" onChange={e => setConfirmPassword(e.target.value)} />

                    <button type="submit" className="login__signInButton" required onClick={registerHandler}>Đăng ký</button>
                </form>

                <p>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button type="submit" className="login__registerButton" onClick={e => history.push(`/signin?redirect=${redirect}`)}>Đến trang đăng nhập&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default RegisterScreen;
