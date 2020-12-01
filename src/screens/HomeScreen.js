import React, { useEffect } from 'react'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux';
import { getListProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


function HomeScreen() {

    const productList = useSelector(state => state.productList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListProducts());
    }, [dispatch])

    const { loading, products, error } = productList;

    console.log(products);

    return (
        <section>
            <h4 className="font-rubik font-size-20 pt-5 pl-5 pb-3">Tất cả sản phẩm</h4>
            <div className="products d-flex justify-content-center flex-wrap font-rale">
                {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                    products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                )}
            </div>
        </section>
    )
}

export default HomeScreen
