import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeCartItem } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

function CartScreen({ match, location, history }) {

    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    console.log(cartItems);

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const handleRemoveCart = (id) => {
        dispatch(removeCartItem(id));
    }

    const handleRedirect = (e) => {
        history.push('/signin?redirect=shipping');
    }

    return (
        <section id="cart" className="py-3">
            <div className="container-fluid w-75">
                <h5 className="font-baloo font-size-20">Giỏ hàng của bạn</h5>

                <div className="row">
                    <div className="col-sm-9">

                        {cartItems.length === 0 ? <MessageBox>Cart hiện tại chưa có gì <Link to="/">Go Shopping</Link></MessageBox> : cartItems.map((item) => (
                            <div className="row border-top py-3 mt-3" key={item.id}>
                                <div className="col-sm-2">
                                    <img src={item.image} style={{ height: "120px" }} alt={item.name}
                                        className="img-fluid" />
                                </div>
                                <div className="col-sm-8">
                                    <h5 className="font-rale font-size-20">{item.name}</h5>
                                    <small>by {item.brand}</small>

                                    <div className="d-flex">
                                        <div className="rating font-size-12 text-warning">
                                            <Rating rating={item.rating} />
                                        </div>
                                        <Link to="#" className="font-rale font-size-14 px-2">{item.rating} rating</Link>
                                    </div>

                                    <div className="qty d-flex pt-2">
                                        <div className="d-flex font-rale w-25">
                                            <select value={item.qty} onChange={e => dispatch(addToCart(item._id, e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1}>{x + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit"
                                            className="btn font-baloo text-danger px-3 border-right" onClick={e => handleRemoveCart(item._id)}>Xóa khỏi giỏ hàng</button>
                                        <button type="submit" className="btn font-baloo text-danger px-3">Lưu lại giỏ hàng</button>
                                    </div>


                                </div>
                                <div className="col-sm-2 text-right">
                                    <div className="font-size-20 font-baloo text-danger">
                                        $ <span className="product-price">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="col-sm-3">
                        <div className="sub-total text-center mt-2 border">
                            <h6 className="text-success font-rale font-size-12 py-3"><i className="fas fa-check"></i> Giỏ hàng của bạn
                            </h6>
                            <div className="border-top py-4">
                                <h5 className="font-baloo font-size-20">Tổng cộng ({cartItems.reduce((total, item) => total += Number(item.qty), 0)} vật phẩm)&nbsp;
                                                <span className="text-danger" id="deal-price">${cartItems.reduce((total, item) => total += (Number(item.qty * item.price)), 0)}</span>
                                </h5>
                                <button className="btn btn-warning mt-3" onClick={handleRedirect} disabled={cartItems.length === 0}>Tiến hành thanh toán</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default CartScreen
