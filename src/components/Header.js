import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import { signout } from '../actions/userActions';

function Header() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch()

    const handleLogout = (e) => {
        dispatch(signout());
    }

    return (
        <div className="header d-flex justify-content-between px-4 py-1 bg-light">
            <p className="font-rale font-size-12 text-black-50 m-0">
                Nam dep zai 2610 cute pro 0384554716 namdepzai2610@gmail.com
           </p>
            <div className="font-rale font-size-14 d-flex">
                <div className="px-3 border-right border-left text-dark">{userInfo ?
                    (
                        <div className="dropdown">
                            <Link to="#">
                                <i className="fas fa-user">&nbsp;&nbsp;</i> Xin chào {userInfo.name}&nbsp;&nbsp;<i className="fas fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <Link to="#signout" onClick={handleLogout}>Đăng xuất</Link>
                            </ul>
                        </div>
                    ) : (<Link to="/signin"><span>Đăng nhập</span></Link>)}</div>
                <Link to="#" className="px-3 border-right text-dark">Whishlist (0)</Link>
            </div>
        </div>
    )
}

export default Header
