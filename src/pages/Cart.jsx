import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from '../hooks/cartSlice';
import LaButton from '../components/LaButton';
import LaInput from '../components/LaInput';
import { updateCartQuantityWithCheck } from '../components/CartThunks';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items || []);
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);

    const calculateItemTotal = (item) => {
        const price = Number(item.Price);
        const quantity = Number(item.quantity);
        const discount = Number(item.discount || 0);
        const discountedPrice = price * (1 - discount / 100);
        return discountedPrice * quantity;
    };

    const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    const total = subtotal - discountAmount;

    const handleRemoveItem = (NidProduct) => {
        dispatch(removeItem(NidProduct));
    };

    const handleQuantityChange = (NidProduct, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartQuantityWithCheck(NidProduct, newQuantity));
        }
    };

    const applyDiscount = () => {
        if (discountCode === 'DISCOUNT10' && !discountApplied) {
            setDiscountAmount(subtotal * 0.1);
            setDiscountApplied(true);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">🛒 سبد خرید شما</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                    <p className="text-lg mb-4 text-gray-600">سبد خرید شما خالی است.</p>
                    <Link
                        to="/shop"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                        بازگشت به فروشگاه
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-4">
                        {cartItems.map((item) => {
                            const itemTotal = calculateItemTotal(item);
                            return (
                                <div key={item.NidProduct} className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4">
                                    <img
                                        src={item.image || 'https://via.placeholder.com/100'}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex-1 w-full">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.Title}</h3>
                                        <div className="text-sm text-gray-600 mb-2">
                                            {item.Price.toLocaleString()} تومان
                                            {item.discount > 0 && (
                                                <span className="mr-2 p-2  text-red text-xl font-bold">
                                                    {item.discount}% تخفیف
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.NidProduct, item.quantity - 1)}
                                                className="px-3 py-1 bg-gray rounded hover:bg-grayLight"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 text-red">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.NidProduct, item.quantity + 1)}
                                                className="px-3 py-1 bg-gray rounded hover:bg-grayLight"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-greenDark mb-2">
                                            {itemTotal.toLocaleString()} تومان
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.NidProduct)}
                                            className="text-sm text-red hover:text-redDark"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 text-gray">خلاصه سفارش</h2>
                            <div className="text-sm space-y-3">
                                <div className="flex justify-between">
                                    <span>جمع کل:</span>
                                    <span>{subtotal.toLocaleString()} تومان</span>
                                </div>
                                {discountApplied && (
                                    <div className="flex justify-between text-greenDark">
                                        <span>تخفیف کد:</span>
                                        <span>-{discountAmount.toLocaleString()} تومان</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold border-t pt-2">
                                    <span>مبلغ نهایی:</span>
                                    <span>{total.toLocaleString()} تومان</span>
                                </div>
                                {!discountApplied && (
                                    <div className="pt-4">
                                        <label className="block text-sm mb-1 text-gray">کد تخفیف</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                name="discountCode"
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                className="flex-1 border rounded px-3 py-2"
                                                placeholder="کد تخفیف"
                                            />
                                            <LaButton onClick={applyDiscount}>
                                                اعمال
                                            </LaButton>
                                        </div>
                                    </div>
                                )}
                                <Link
                                    to="/checkout"
                                    className="block bg-greenDark text-white text-center py-3 rounded-full hover:bg-green-700 transition mt-6"
                                >
                                    ثبت سفارش
                                </Link>
                                <Link
                                    to="/productsAll"
                                    className="block text-center text-blueDark mt-3 text-sm"
                                >
                                    ادامه خرید
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;