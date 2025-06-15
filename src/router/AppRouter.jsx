import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';

import MainLayout from '../layouts/MainLayout';

function AppRouter() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default AppRouter;
