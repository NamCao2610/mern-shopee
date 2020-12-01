import React from 'react'
import '../css/CheckoutSteps.css'

function CheckoutSteps(props) {
    return (
        <div class="container d-flex justify-content-center flex-wrap align-items-center checkout-steps mt-5">
            <div className={props.step1 ? 'active' : ''}>Đăng nhập</div>
            <div className={props.step2 ? 'active' : ''}>Chuyển giao</div>
            <div className={props.step3 ? 'active' : ''}>Thanh toán</div>
            <div className={props.step4 ? 'active' : ''}>Vật phẩm đã thanh toán</div>
        </div>
    )
}

export default CheckoutSteps
