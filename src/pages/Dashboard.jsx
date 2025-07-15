import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import LaButton from "../components/LaButton";
import InvoiceModal from "../components/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function AdvancedUserDashboard() {
    const User = useSelector((state) => state.userLog) || {};
    const token = useSelector((state) => state.auth) || {};
    const [user, setUser] = useState(User);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [orders, setOrders] = useState([
        {
            id: 1423,
            date: "2025-06-30T14:10:00",
            items: [
                { name: "موس وایرلس", quantity: 1, unitPrice: 250000 },
                { name: "کیبورد مکانیکی", quantity: 1, unitPrice: 850000 },
            ],
            total: 1100000,
            status: "تحویل شده"
        },
        {
            id: 1422,
            date: "2025-06-28T11:30:00",
            items: [
                { name: "کارت گرافیک RTX 3060", quantity: 1, unitPrice: 15000000 },
            ],
            total: 15000000,
            status: "در حال پردازش"
        },
        {
            id: 1421,
            date: "2025-06-25T09:15:00",
            items: [
                { name: "مانیتور ۲۷ اینچ", quantity: 1, unitPrice: 8000000 },
                { name: "کیبورد مکانیکی", quantity: 1, unitPrice: 850000 },
            ],
            total: 8850000,
            status: "ارسال شده"
        }
    ]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setMonthlyData([
            { name: "فروردین", خرید: 120 },
            { name: "اردیبهشت", خرید: 98 },
            { name: "خرداد", خرید: 85 },
            { name: "تیر", خرید: 130 },
            { name: "مرداد", خرید: 105 },
        ]);

        setCategoryData([
            { name: "لپ‌تاپ", value: 35 },
            { name: "کارت گرافیک", value: 25 },
            { name: "لوازم جانبی", value: 40 },
        ]);
    }, []);

    useEffect(() => {
        // فرض بر اینکه API موجود است و دیتا را برمی‌گرداند
        fetch("/api/user/dashboard")
            .then(res => res.json())
            .then(data => {
                setMonthlyData(data.monthlyPurchases);
                setCategoryData(data.categoryStats);
            });
    }, []);

    const handleShowInvoice = (orderId) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            setSelectedInvoice(order);
            setShowInvoiceModal(true);
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold"> داشبورد کاربر {user.User.Name} {user.User.LastName} </h1>

            {/* آمار کلیدی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><CardContent><p className="text-gray-500">سفارشات شما</p><p className="text-2xl font-bold">56</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">در حال پردازش</p><p className="text-2xl font-bold">5</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">جمع خرید</p><p className="text-2xl font-bold">8,450,000 تومان</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">موجودی کیف پول</p><p className="text-2xl font-bold text-green-600">145,000 تومان</p></CardContent></Card>
            </div>

            {/* تنظیمات سریع */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card onClick={() => navigate("/profile")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">ویرایش پروفایل</p></CardContent></Card>
                <Card onClick={() => navigate("/wallet")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">کیف پول</p></CardContent></Card>
                <Card onClick={() => navigate("/support")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">تیکت پشتیبانی</p></CardContent></Card>
                <Card onClick={() => navigate("/invoices")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">فاکتورهای من</p></CardContent></Card>
            </div>

            {/* نمودارها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-4">خرید ماهانه</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="خرید" fill="#B58E23" /></BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-4">خرید بر اساس دسته‌بندی</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
                                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* پیام‌های مهم */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">پیام‌های مهم</h2>
                    <ul className="text-sm space-y-1 text-gray-600">
                        <li>📦 سفارش شماره ۱۴۲۳ در حال ارسال است.</li>
                        <li>🎁 کد تخفیف ۱۰٪ برای شما فعال شد: <strong>LAND10</strong></li>
                        <LaButton onClick={() => handleShowInvoice(1423)} variant="secondary">
                            نمایش فاکتور
                        </LaButton>
                    </ul>
                </CardContent>
            </Card>

            {/* سفارش‌ها */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-4">آخرین سفارش‌ها</h2>
                    <ul className="space-y-2">
                        {orders.slice(0, 3).map(order => (
                            <li key={order.id} className="flex justify-between border-b pb-2">
                                <div>
                                    <span>{order.items[0].name}</span>
                                    {order.items.length > 1 && (
                                        <span className="text-gray-500 text-sm mr-2"> + {order.items.length - 1} کالای دیگر</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">
                                        {new Date(order.date).toLocaleDateString('fa-IR')}
                                    </span>
                                    <LaButton
                                        size="small"
                                        onClick={() => handleShowInvoice(order.id)}
                                        variant="outline"
                                    >
                                        فاکتور
                                    </LaButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <LaButton onClick={() => setShowOrdersModal(true)}>
                            مشاهده همه سفارش‌ها
                        </LaButton>
                    </div>
                </CardContent>
            </Card>

            {/* وفاداری و ورود اخیر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">سطح کاربر: طلایی</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">امتیاز فعلی: ۷۰۰ از ۱۰۰۰</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">ورودهای اخیر</h2>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>📍 تهران - Chrome - ۲۸ خرداد</li>
                            <li>📱 مشهد - Android - ۲۷ خرداد</li>
                            <li>🖥️ تهران - Edge - ۲۶ خرداد</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* مودال سفارش‌ها */}
            {showOrdersModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">همه سفارش‌ها</h2>
                            <button
                                onClick={() => setShowOrdersModal(false)}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <ul className="divide-y text-sm">
                            {orders.map(order => (
                                <li key={order.id} className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="font-medium">{order.items[0].name}</p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(order.date).toLocaleDateString('fa-IR')} - وضعیت: {order.status}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {order.total.toLocaleString()} تومان
                                        </span>
                                        <LaButton
                                            size="small"
                                            onClick={() => {
                                                setSelectedInvoice(order);
                                                setShowInvoiceModal(true);
                                                setShowOrdersModal(false);
                                            }}
                                            variant="outline"
                                        >
                                            فاکتور
                                        </LaButton>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* مودال فاکتور */}
            {showInvoiceModal && (
                <InvoiceModal
                    onClose={() => setShowInvoiceModal(false)}
                    invoice={selectedInvoice}
                />
            )}
        </div>
    );
}