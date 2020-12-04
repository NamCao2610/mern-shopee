
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <header>
          <Header />
        </header>

        {/* Navbar */}
        <Navbar />
        {/* main */}
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="bg-dark text-white py-5">
          <Footer />
        </footer>

        <Copyright />

      </div>
    </BrowserRouter>
  );
}

export default App;
