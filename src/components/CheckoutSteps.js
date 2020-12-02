import React from 'react'
import '../css/CheckoutSteps.css'

function CheckoutSteps(props) {
    return (
        <div class="container d-flex justify-content-center flex-wrap align-items-center checkout-steps mt-5">
            <div className={props.step1 ? 'active' : ''}>Đăng nhập</div>
            <div className={props.step2 ? 'active' : ''}>Nhập thông tin giao hàng</div>
            <div className={props.step3 ? 'active' : ''}>Chọn hình thức thanh toán</div>
            <div className={props.step4 ? 'active' : ''}>Tổng kết đơn hàng</div>
        </div>
    )
}

export default CheckoutSteps
