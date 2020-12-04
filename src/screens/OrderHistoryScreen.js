import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListOrderMine } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function OrderHistoryScreen(props) {

    const orderMineList = useSelector(state => state.orderMineList);
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const { loading, orders, error } = orderMineList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListOrderMine());
    }, [dispatch]);

    return (
        <div className="container">
            <h5 className="font-baloo font-size-20 py-3">Đơn hàng của bạn <span className="color-warning">{userInfo?.name}</span></h5>

            { loading ? <LoadingBox></LoadingBox> : error ? <MessageBox>{error}</MessageBox> : (
                <table className="table mt-2">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Ngày nhập đơn hàng</th>
                            <th scope="col">Tổng thanh toán</th>
                            <th scope="col">Thanh toán</th>
                            <th scope="col">Vận chuyển</th>
                            <th scope="col">Thông tin chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? <tr><td>Bạn chưa có đơn hàng nào hãy mua hàng nào...</td></tr> : orders.map((order) => (
                            <tr key={order._id}>
                                <th scope="row">{order._id}</th>
                                <td>{order.createdAt}</td>
                                <td>${order.totalPayment.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Chưa thanh toán'}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Chưa vận chuyển'}</td>
                                <td>
                                    <button type="button" className="btn btn-info" onClick={() => props.history.push(`/order/${order._id}`)}>Chi tiết đơn hàng</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrderHistoryScreen
