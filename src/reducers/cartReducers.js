import { CART_ADD_PRODUCT, CART_ADD_FAIL, CART_REMOVE_PRODUCT, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_EMPTY } from '../constants/cartContants';

export const cartReducers = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_PRODUCT:
            const item = action.payload
            const existingCart = state.cartItems.find((x) => x.product === item.product);
            if (existingCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => existingCart.product === x.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        item
                    ]
                }
            }
        case CART_ADD_FAIL:
            return {
                error: action.payload
            }
        case CART_REMOVE_PRODUCT:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}