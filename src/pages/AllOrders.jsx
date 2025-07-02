import React from "react";

const orders = [
    { id: 1, title: "کیبورد مکانیکی", date: "۲۵ خرداد", status: "تحویل‌شده" },
    { id: 2, title: "کارت گرافیک RTX 3060", date: "۲۲ خرداد", status: "در حال ارسال" },
    { id: 3, title: "مانیتور ۲۷ اینچ", date: "۱۹ خرداد", status: "در انتظار پرداخت" },
    { id: 4, title: "هارد اکسترنال 1TB", date: "۱۶ خرداد", status: "تحویل‌شده" },
    { id: 5, title: "موس وایرلس", date: "۱۳ خرداد", status: "لغو شده" },
];

export default function AllOrders({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">همه سفارش‌ها</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700 font-bold"
                    >
                        بستن ✕
                    </button>
                </div>

                <ul className="divide-y">
                    {orders.map((order) => (
                        <li key={order.id} className="py-3 flex justify-between">
                            <div>
                                <p className="font-medium">{order.title}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <span className="text-sm text-gray-600">{order.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
