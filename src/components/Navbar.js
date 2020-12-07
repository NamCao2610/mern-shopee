import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    return (

        <nav className="navbar navbar-expand-lg navbar-dark color-second-bg">
            <Link className="navbar-brand" to="/">Shopee</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav m-auto font-rubik">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Mặt hàng <i className="fas fa-chevron-down"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Danh sách sản phẩm<i className="fas fa-chevron-down"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/blog">Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/commingsoon">Nam dep zai</Link>
                    </li>
                </ul>
                <form action="#" className="font-size-14 font-rale">
                    <Link to="/cart" className="py-2 rounded-pill color-primary-bg">
                        <span className="font-size-16 px-2 text-white"><i className="fas fa-shopping-cart"></i></span>
                        <span className="px-3 py-2 rounded-pill text-dark bg-light">{cartItems.length}</span>
                    </Link>
                </form>
            </div>
        </nav >

    )
}

export default Navbar
