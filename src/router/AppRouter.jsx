import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';
import Logging from '../pages/Logging';
import Information from '../pages/Information';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ChatWidget from '../components/ChatWidget';
import DisCount from '../pages/DisCount';
import Contact from '../pages/Contact';
import { NotiActions } from '../hooks/Notiaction';
import ProtectedRoute from '../components/ProtectedRoute';
import Notification from '../components/Notification';
import ProductsAll from '../pages/ProductsAll';

function AppRouter() {
    const notification = useSelector((state) => state.noti.notiaction);
    const isLoggedIn = useSelector((state) => state.auth.loggedIn); // وضعیت ورود

    const dispatch = useDispatch();
    React.useEffect(() => {
        if (notification && notification.open) {
            const timer = setTimeout(() => {
                dispatch(
                    NotiActions.showNotification({
                        open: false,
                        message: "",
                        type: "",
                    })
                );
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    return (
        <Router>
            <MainLayout>
                {notification?.open && (
                    <Notification
                        type={notification.type}
                        message={notification.message}
                    />
                )}
                <Routes>
                    <Route
                        path="/logging"
                        element={
                            isLoggedIn ? <Navigate to="/dashboard" /> : <Logging />
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/productsAll" element={<ProductsAll />} />
                    <Route path="/disCount" element={<DisCount />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatWidget />
            </MainLayout>
        </Router>
    );
}

export default AppRouter;
