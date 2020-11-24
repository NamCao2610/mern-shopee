import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDetailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

function ProductScreen({ match, history }) {

    const productId = match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(getDetailsProduct(productId));
    }, [dispatch, productId])

    const { loading, product, error } = productDetails;

    const addToCartHandler = (e) => {
        history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <section id="product" className="py-3">
            <div className="container">
                {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                    <div className="row">

                        <div className="col-sm-6">
                            <img src={product.image} className="img-fluid" alt={product.name} />
                            <div className="form-row pt-4 font-size-16 font-baloo">
                                {product.countInStock === 0 ? (
                                    <div className="col">
                                        <button className="btn btn-danger form-control">Sorry, Hết hàng rồi hẹn bạn lần sau nha <i className="fas fa-sad-cry" style={{ color: "yellow" }}></i> </button>
                                    </div>
                                ) : (
                                        <>
                                            <div className="col">
                                                <button className="btn btn-danger form-control">Thanh Toán</button>
                                            </div>
                                            <div className="col">
                                                <button className="btn btn-warning form-control" onClick={addToCartHandler}>Thêm vào giỏ hàng</button>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>

                        <div className="col-sm-6 py-5">
                            <h5 className="font-baloo font-size-20">{product.name}</h5>
                            <small>by {product.brand}</small>
                            <div className="d-flex">
                                <div className="rating font-size-12 text-warning">
                                    <Rating rating={product.rating} />
                                </div>
                                <a href="/" className="px-2 font-rale font-size-14 text-black">{product.rating} ratings | {product.numReviews}
                                 đánh giá
                               </a>
                            </div>
                            <hr className="m-0" />

                            <table className="my-3">
                                <thead>
                                    <tr className="font-rale font-size-14">
                                        <td>Giá gốc</td>
                                        <td><strike>${Number(product.price + 40)}</strike></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="font-rale font-size-14">
                                        <td>Giảm còn:</td>
                                        <td className="font-size-20 text-danger"><span>${product.price}
                                        </span><small className="font-size-12 text-dark">&nbsp;Bao gồm cả ship</small>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="font-rale font-size-14">
                                        <td>Tổng thanh toán của bạn:</td>
                                        <td className="font-size-16 text-danger">$<span>{product.price}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>



                            <div id="policy">
                                <div className="d-flex">
                                    <div className="return text-center mr-5">
                                        <div className="font-size-20 my-2 color-second">
                                            <span className="fas fa-retweet border p-3 rounded-pill"></span>
                                        </div>
                                        <a href="/" className="font-size-12 font-rale">10 Ngày <br /> Thay đổi</a>
                                    </div>

                                    <div className="return text-center mr-5">
                                        <div className="font-size-20 my-2 color-second">
                                            <span className="fas fa-truck border p-3 rounded-pill"></span>
                                        </div>
                                        <a href="/" className="font-size-12 font-rale">10 Ngày <br /> Thay đổi</a>
                                    </div>

                                    <div className="return text-center mr-5">
                                        <div className="font-size-20 my-2 color-second">
                                            <span className="fas fa-check-double border p-3 rounded-pill"></span>
                                        </div>
                                        <a href="/" className="font-size-12 font-rale">10 ngày <br /> Thay đổi</a>
                                    </div>
                                </div>
                            </div>

                            <hr />


                            <div id="order-details" className="font-rale d-flex flex-column text-dark">
                                <small>Vận chuyển ngày : Mar 29 -April</small>
                                <small>Đóng gói bởi <a href="/">Nam dep zai</a>(4.5 trên 5 | 18,199 ram</small>
                                <small><i className="fas fa-map-marker-alt color-primary"></i>&nbsp;&nbsp;Vận chuyển tới khách hàng -42401</small>
                            </div>


                            <div className="row">
                                <div className="col-6">
                                    <div className="color my-3">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="font-baloo">Màu</h6>
                                            <div className="p-2 color-yellow-bg rounded-circle">
                                                <button className="btn font-size-14"></button>
                                            </div>
                                            <div className="p-2 color-primary-bg rounded-circle">
                                                <button className="btn font-size-14"></button>
                                            </div>
                                            <div className="p-2 color-second-bg rounded-circle">
                                                <button className="btn font-size-14"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="qty d-flex">
                                        <h6 className="font-baloo">Số lượng: </h6>
                                        <div className="px-4 d-flex font-rale">
                                            {product.countInStock && (
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1}>{x + 1}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="size my-3">
                                <h6 className="font-baloo">Size: </h6>
                                <div className="d-flex justify-content-between w-75">
                                    <div className="font-rubik border p-2">
                                        <button className="btn p-0font-size-14">4GB RAM</button>
                                    </div>
                                    <div className="font-rubik border p-2">
                                        <button className="btn p-0font-size-14">6GB RAM</button>
                                    </div>
                                    <div className="font-rubik border p-2">
                                        <button className="btn p-0font-size-14">8GB RAM</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-12">
                            <h6>Chi tiết sản phẩm</h6>
                            <hr />
                            <p className="font-rale font-size-14">{product.description}
                            </p>
                            <p className="font-rale font-size-14">{product.description}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductScreen
