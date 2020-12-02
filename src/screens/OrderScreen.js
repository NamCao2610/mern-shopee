import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import MessageBox from '../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import axios from '../axios';
import { PayPalButton } from 'react-paypal-button-v2';

function OrderScreen(props) {

    const orderId = props.match.params.id;

    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }

        if (!order?._id) {
            dispatch(getOrderDetails(orderId));
        } else {
            console.log(window.paypal);
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, order])

    const successPaymentHandler = () => {

    }

    return (
        <div>
            {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                <section id="placeorder" className="py-5">
                    <div className="container-fluid w-75">
                        <h5 className="font-baloo font-size-20">Mã đơn hàng của bạn:&nbsp; {order._id}</h5>

                        <div className="row">
                            <div className="col-sm-8">
                                <>
                                    <div className="shipping-address card mt-2">
                                        <div className="card-body">
                                            <h5 className="card-title">Giao hàng đến: </h5>
                                            <p className="card-text"><strong>Tên khách hàng: </strong>{order.shippingAddress.fullName}</p>
                                            <p className="card-text"><strong>Địa chỉ nhận hàng: </strong>{order.shippingAddress.address + ', ' + order.shippingAddress.city + ', ' + order.shippingAddress.postalCode + ', ' + order.shippingAddress.country}</p>
                                            {order.isDeliveried ? <MessageBox variant="success">Đơn hàng này đã chuyển xong</MessageBox> : <MessageBox variant="danger">Đơn hàng chưa được vận chuyển</MessageBox>}
                                        </div>
                                    </div>
                                    <div className="payment-method card mt-2">
                                        <div className="card-body">
                                            <h5 className="card-title">Hình thức thanh toán: </h5>
                                            <p className="card-text"><strong>loại thanh toán: </strong>{order.paymentMethod}</p>
                                            {order.isPaid ? <MessageBox variant="success">Đơn hàng này đã được thanh toán</MessageBox> : <MessageBox variant="danger">Đơn hàng chưa thanh toán</MessageBox>}
                                        </div>
                                    </div>
                                    <div className="order card mt-2">
                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách sản phẩm trong đơn hàng: </h5>
                                        </div>
                                    </div>
                                    {order.orderItems.map((item) => (
                                        <div className="row border-top py-3 mt-1" key={item._id}>
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

                            </div>

                            <div className="col-sm-4">
                                <div className="sub-total text-center mt-2 border">
                                    <h6 className="text-success font-rale font-size-12 py-3"><i className="fas fa-check"></i> Chi tiết thanh toán
                                    </h6>
                                    <div className="border-top py-4">
                                        <h5 className="font-baloo font-size-20">Tổng đơn hàng: &nbsp;</h5>
                                        <p className="d-flex justify-content-around py-2 border-top">
                                            <span>Tổng giá tiền: </span>
                                            <span>${order.totalPrice.toFixed(2)}</span>
                                        </p>
                                        <p className="d-flex justify-content-around py-2 border-top">
                                            <span>Tiền ship: </span>
                                            <span>${order.shippingPrice.toFixed(2)}</span>
                                        </p>
                                        <p className="d-flex justify-content-around py-2 border-top">
                                            <span>Tiền grab: </span>
                                            <span>${order.grabPrice.toFixed(2)}</span>
                                        </p>
                                        <p className="d-flex justify-content-around py-2 border-top">
                                            <strong>Tổng thanh toán: </strong>
                                            <span>${order.totalPayment.toFixed(2)}</span>
                                        </p>
                                        {
                                            !order.isPaid && (
                                                <div>
                                                    <p className="d-flex justify-content-around py-1 border-top">
                                                        <span>Thanh toán đơn hàng của bạn tại đây:</span>
                                                    </p>
                                                    { !sdkReady ? (<LoadingBox />) : (<PayPalButton amount={order.totalPayment} onSuccess={successPaymentHandler}></PayPalButton>)}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default OrderScreen
