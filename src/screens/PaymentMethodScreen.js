import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import '../css/PaymentMethod.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

function PaymentMethodScreen(props) {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="payment">
                <Link to='/'>
                    <img className="payment__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png" alt="logo" />
                </Link>

                <div className="payment__container">
                    <h3>Chọn phương thức thanh toán</h3>

                    <form>
                        <div>
                            <input type="radio" name="payment" id="PayPal" value="PayPal" onChange={e => setPaymentMethod(e.target.value)} required checked />&nbsp;&nbsp;
                            <label htmlFor="PayPal">Thẻ PayPal</label>
                        </div>
                        <div>
                            <input type="radio" name="payment" id="Stripe" value="Stripe" onChange={e => setPaymentMethod(e.target.value)} required />&nbsp;&nbsp;
                            <label htmlFor="Stripe">Stripe</label>
                        </div>
                        <button type="submit" className="payment__button" onClick={submitHandler}>Tiếp tục</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default PaymentMethodScreen
