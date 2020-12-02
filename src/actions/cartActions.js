import { CART_ADD_PRODUCT, CART_ADD_FAIL, CART_REMOVE_PRODUCT, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartContants';
import axios from '../axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`api/products/${productId}`);
        dispatch({
            type: CART_ADD_PRODUCT,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                brand: data.brand,
                rating: data.rating,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({
            type: CART_ADD_FAIL,
            payload: error.response ? error.response.data.error : error.message
        })
    }
}

export const removeCartItem = (productId) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_PRODUCT,
        payload: productId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
}