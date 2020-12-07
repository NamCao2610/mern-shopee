import React, { useEffect, useState } from 'react'
import '../css/ProfileScreen.css'
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { getDetailsUser, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userContants';

function ProfileScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getDetailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu nhập lại không trùng khớp');
        }
        else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }

    return (
        <div>
            { loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                <div className="login">
                    <h5 className="font-baloo font-size-20 mt-3 mb-3">Thông tin cá nhân của bạn</h5>
                    <div className="login__container">
                        <form onSubmit={submitHandler}>
                            <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
                                {successUpdate && <MessageBox variant="success">{'Cập nhật thành công'}</MessageBox>}
                                <h5 className="font-baloo font-size-20 mt-2 mb-2">Tên: </h5>
                                <input type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />

                                <h5 className="font-baloo font-size-20 mt-2 mb-2">Email: </h5>
                                <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />

                                <h5 className="font-baloo font-size-20 mt-2 mb-2">Mật khẩu: </h5>
                                <input type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />

                                <h5 className="font-baloo font-size-20 mt-2 mb-2">Nhập lại mật khẩu: </h5>
                                <input type="password" placeholder="Enter confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />

                                <button type="submit" className="login__signInButton mt-3">Đổi thông tin tài khoản</button>
                            </>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileScreen
