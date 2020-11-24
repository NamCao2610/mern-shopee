import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Product({ product }) {

    const history = useHistory();

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const currentProduct = cartItems.find((x) => x._id === product._id);

    const handleAddToCart = () => {
        if (!currentProduct) {
            history.push(`cart/${product._id}?qty=${Number(1)}`);
        } else {
            history.push(`cart/${product._id}?qty=${parseInt(currentProduct.qty) + Number(1)}`)
        }
    }

    return (
        <div className="items border mr-2 mb-3" style={{ width: '300px' }}>
            <Link to={`product/${product._id}`}><img src={product.image} alt="products" className="img-fluid" /></Link>
            <div className="text-center">
                <h6><Link to={`product/${product._id}`}>{product.name}</Link></h6>
                <div className="rating text-warning font-size-12">
                    <Rating rating={product.rating} />
                </div>
                <div className="price py-1">
                    <span>${product.price}</span>
                </div>
                <div className="reviews py-1 font-size-12">
                    <span>{product.numReviews} đánh giá</span>
                </div>
                <button type="button" disabled={!product.countInStock} className={product.countInStock ? "btn btn-warning font-size-12 mb-2" : "btn btn-danger font-size-12 mb-"} onClick={handleAddToCart}>{product.countInStock ? 'Thêm vào giỏ hàng' : 'Đã hết hàng'}</button>
            </div>
        </div>

    )
}

export default Product
