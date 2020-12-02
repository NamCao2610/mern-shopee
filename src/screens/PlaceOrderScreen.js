import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import MessageBox from '../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderContants';
import LoadingBox from '../components/LoadingBox';

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);

    if (!cart.shippingAddress.address) {
        props.history.push('/payment');
    }

    const dispatch = useDispatch();
    const toPrice = (num) => Number(num.toFixed(2));

    cart.totalPrice = toPrice(cart.cartItems.reduce((total, item) => total + item.qty * item.price, 0));
    cart.shippingPrice = cart.totalPrice > 1000 ? toPrice(0) : toPrice(15);
    cart.grabPrice = toPrice(((cart.totalPrice * 5) / 100));

    cart.totalPayment = toPrice((cart.totalPrice + cart.shippingPrice + cart.grabPrice));

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, order, error, success } = orderCreate;

    const placeOrderPayment = (e) => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <section id="placeorder" className="py-5">
                <div className="container-fluid w-75">
                    <h5 className="font-baloo font-size-20">Chi tiết đơn hàng</h5>

                    <div className="row">
                        <div className="col-sm-8">
                            {cart.cartItems.length === 0 ? <MessageBox>Cart hiện tại chưa có gì <Link to="/">Go Shopping</Link></MessageBox> :
                                <>
                                    <div class="shipping-address card mt-2">
                                        <div class="card-body">
                                            <h5 class="card-title">Giao hàng đến: </h5>
                                            <p class="card-text"><strong>Tên khách hàng: </strong>{cart.shippingAddress.fullName}</p>
                                            <p class="card-text"><strong>Địa chỉ nhận hàng: </strong>{cart.shippingAddress.address + ', ' + cart.shippingAddress.city + ', ' + cart.shippingAddress.postalCode + ', ' + cart.shippingAddress.country}</p>
                                        </div>
                                    </div>
                                    <div class="payment-method card mt-2">
                                        <div class="card-body">
                                            <h5 class="card-title">Hình thức thanh toán: </h5>
                                            <p class="card-text"><strong>loại thanh toán: </strong>{cart.paymentMethod}</p>
                                        </div>
                                    </div>
                                    {cart.cartItems.map((item) => (
                                        <div className="row border-top py-3 mt-3" key={item.id}>
                                            <div className="col-sm-2">
                                                <img src={item.image} style={{ height: "120px" }} alt={item.name}
                                                    className="img-fluid" />
                                            </div>
                                            <div className="col-sm-7">
                                                <h5 className="font-rale font-size-20">{item.name}</h5>
                                                <small>by {item.brand}</small>

                                                <div className="d-flex">
                                                    <div className="rating font-size-12 text-warning">
                                                        <Rating rating={item.rating} />
                                                    </div>
                                                    <Link to="#" className="font-rale font-size-14 px-2">{item.rating} rating</Link>
                                                </div>

                                            </div>
                                            <div className="col-sm-3 text-right">
                                                <div className="font-size-20 font-baloo text-danger">
                                                    {item.qty} x $ {item.price} =
                                                    $ <span className="product-price">{item.price * item.qty}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }

                        </div>

                        <div className="col-sm-4">
                            <div className="sub-total text-center mt-2 border">
                                <h6 className="text-success font-rale font-size-12 py-3"><i className="fas fa-check"></i> Chi tiết thanh toán
                            </h6>
                                <div className="border-top py-4">
                                    <h5 className="font-baloo font-size-20">Tổng cộng Order: &nbsp;</h5>
                                    <p className="d-flex justify-content-around py-2 border-top">
                                        <span>Tổng giá tiền: </span>
                                        <span>${cart.totalPrice.toFixed(2)}</span>
                                    </p>
                                    <p className="d-flex justify-content-around py-2 border-top">
                                        <span>Tiền ship: </span>
                                        <span>${cart.shippingPrice.toFixed(2)}</span>
                                    </p>
                                    <p className="d-flex justify-content-around py-2 border-top">
                                        <span>Tiền grab: </span>
                                        <span>${cart.grabPrice.toFixed(2)}</span>
                                    </p>
                                    <p className="d-flex justify-content-around py-2 border-top">
                                        <strong>Tổng thanh toán: </strong>
                                        <span>${cart.totalPayment.toFixed(2)}</span>
                                    </p>
                                    <button className="btn btn-warning mt-3 mb-3" disabled={cart.cartItems.length === 0} onClick={placeOrderPayment}>Tiến hành thanh toán</button>
                                    {
                                        loading && <LoadingBox />
                                    }
                                    {
                                        error && <MessageBox>{error}</MessageBox>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default PlaceOrderScreen
