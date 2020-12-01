import React from 'react'

function Footer() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-12">
                    <h4 className="font-rubik font-size-20">Shopee</h4>
                    <p className="font-size-14 font-rale text-white-50">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam optio natus, et
                        non nesciunt?
                    </p>
                </div>

                <div className="col-lg-4 col-12">
                    <h4 className="font-rubik font-size-20">Nhận email</h4>
                    <form className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Email" />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary mb-2">Theo dõi</button>
                        </div>
                    </form>
                </div>

                <div className="col-lg-2 col-12">
                    <h4 className="font-rubik font-size-20">Thông tin thêm</h4>
                    <div className="d-flex flex-column flex-wrap">
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Về chúng tôi</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Thông tin giao hàng</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Chính sách bảo mật</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Terms & Conditions</a>
                    </div>
                </div>

                <div className="col-lg-3 col-12">
                    <h4 className="font-rubik font-size-20">Tài khoản</h4>
                    <div className="d-flex flex-column flex-wrap">
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Tà khoản của bạn</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Lịch sử giao dịch</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Whistlist</a>
                        <a href="/" className="font-rale font-size-14 text-white-50 pb-1">Thư mới</a>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Footer
