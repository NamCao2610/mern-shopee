import React, { useEffect } from 'react'
import '../css/ProfileScreen.css'
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { getDetailsUser } from '../actions/userActions';

function ProfileScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailsUser(userInfo?._id));
    }, [dispatch, userInfo])

    return (
        <div>
            { loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                <div className="login">
                    <h5 className="font-baloo font-size-20 mt-3 mb-3">Thông tin cá nhân của bạn</h5>
                    <div className="login__container">
                        <form>
                            <h5 className="font-baloo font-size-20 mt-2 mb-2">Tên: </h5>
                            <input type="text" placeholder="Enter name" value={user.name} />

                            <h5 className="font-baloo font-size-20 mt-2 mb-2">Email: </h5>
                            <input type="email" placeholder="Enter email" value={user.email} />

                            <h5 className="font-baloo font-size-20 mt-2 mb-2">Mật khẩu: </h5>
                            <input type="password" />

                            <h5 className="font-baloo font-size-20 mt-2 mb-2">Nhập lại mật khẩu: </h5>
                            <input type="password" />

                            <button type="submit" className="login__signInButton mt-3" >Đổi thông tin tài khoản</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileScreen
