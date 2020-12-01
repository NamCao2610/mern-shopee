import React, { useState } from 'react'
import '../components/CheckoutSteps';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';
import '../css/ShippingAddress.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

function ShippingAddressScreen({ history }) {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    if (!userInfo) {
        history.push('/signin')
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
        history.push('/payment');
    }


    return (
        <div>
            <CheckoutSteps step1 step2 />
            <div className="shipping">
                <Link to='/'>
                    <img className="shipping__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png" alt="logo" />
                </Link>

                <div className="shipping__container">
                    <h3>Shipping</h3>

                    <form>
                        <h5>Tên đầy đủ: </h5>
                        <input type="text" placeholder="Nhập họ tên" value={fullName} onChange={e => setFullName(e.target.value)} />

                        <h5>Địa chỉ: </h5>
                        <input type="text" placeholder="Nhập tên thành phố" value={address} onChange={e => setAddress(e.target.value)} />

                        <h5>Thành phố: </h5>
                        <input type="text" placeholder="Nhập địa chỉ cần giao" value={city} onChange={e => setCity(e.target.value)} />

                        <h5>Postal Code: </h5>
                        <input type="text" placeholder="Nhập postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />

                        <h5>Quốc gia: </h5>
                        <input type="text" placeholder="Nhập tên quốc gia" value={country} onChange={e => setCountry(e.target.value)} />

                        <button type="submit" className="shipping__button" onClick={submitHandler}>Tiếp tục</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ShippingAddressScreen
