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
import Profile from "./Profile";
import { getAllOrder } from "../services/Orders/getAllOrder";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function AdvancedUserDashboard() {
    const User = useSelector((state) => state.userLog) || {};
    const [user, setUser] = useState(User);
    const [profile, serProfile] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [orders, setOrders] = useState();
    // اضافه در بالا
    const [visibleCards, setVisibleCards] = useState(0);
    useEffect(() => {
        setUser(User);
    }, [User]);

    useEffect(() => {
        if (user.dashboard) {
            const interval = setInterval(() => {
                setVisibleCards((prev) => {
                    if (prev >= 4) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 40);
            return () => clearInterval(interval);
        }
    }, [user.dashboard]);
    const refreshProfile = () => {
        setUser(User);
        serProfile(false);
    };

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


    const fetchOrders = async () => {
        try {
            const data = await getAllOrder(user.User?.NidUser);
            if (data.success) {
                setOrders(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (user?.dashboard.TotalOrders > 0) {
            fetchOrders();
        }
    }, [user])
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        console.log(user);
        if (token && !user.User?.NidUser) {
            localStorage.removeItem("token");
            navigate("/logging");
        }
    }, [user]);



    const handleShowInvoice = (orderId) => {
        const order = orders.find(o => o.NidOrder === orderId);
        if (order) {
            setSelectedInvoice(order);
            setShowInvoiceModal(true);
        }
    };


    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold"> داشبورد کاربر {user?.User?.Name} {user?.User?.LastName} </h1>

            {/* آمار کلیدی - رندر تدریجی */}
            {user?.dashboard && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: "سفارشات شما",
                            value: user?.dashboard[0]?.TotalOrders
                        },
                        {
                            label: "آخرین ورود",
                            value: new Date(user?.User?.LastLogin).toLocaleDateString('fa-IR')
                        },
                        {
                            label: "جمع خرید",
                            value: `${user?.dashboard[0]?.WalletBalance.toLocaleString('fa-IR')
                                } تومان`
                        },
                        {
                            label: "موجودی کیف پول",
                            value: `${user?.dashboard[0]?.TotalAmount.toLocaleString('fa-IR')} تومان`,
                            className: "text-green-600"
                        }
                    ]
                        .slice(0, visibleCards)
                        .map((item, idx) => (
                            <Card key={idx}>
                                <CardContent>
                                    <p className="text-gray-500">{item.label}</p>
                                    <p className={`text-2xl font-bold ${item.className || ''}`}>
                                        {item.value}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            )}


            {/* تنظیمات سریع */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card onClick={() => serProfile(true)}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">ویرایش پروفایل</p></CardContent></Card>
                <Card > <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">کیف پول</p></CardContent></Card>
                <Card onClick={() => navigate("/support")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">تیکت پشتیبانی</p></CardContent></Card>
                <Card onClick={() => navigate("/invoices")}> <CardContent className="cursor-pointer hover:bg-gray-50 text-center"><p className="text-teal font-bold text-lg">فاکتورهای من</p></CardContent></Card>
            </div>



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


            {/* سفارش‌ها */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-4">آخرین سفارش‌ها</h2>
                    <ul className="space-y-2">

                        {orders ? orders.map(order => (
                            <li key={order.NidOrder} className="flex justify-between border-b pb-2">
                                <div>
                                    <span>ارسال به: {order.sendAddress}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">
                                        {new Date(order.OrderDate).toLocaleDateString('fa-IR')}
                                    </span>
                                    <LaButton
                                        size="small"
                                        onClick={() => handleShowInvoice(order.NidOrder)}
                                        variant="outline"
                                    >
                                        فاکتور
                                    </LaButton>
                                </div>
                            </li>
                        )) : <div>سفارشی نداشتید</div>}

                    </ul>
                    {orders && <div className="flex justify-end mt-4">
                        <LaButton onClick={() => navigate("/invoices")}>
                            مشاهده همه سفارش‌ها
                        </LaButton>
                    </div>}
                </CardContent>
            </Card>

            {/* وفاداری و ورود اخیر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">سطح کاربر: طلایی</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${user?.dashboard[0]?.TotalOrders}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">امتیاز فعلی: {(user?.dashboard[0]?.TotalOrders * 10).toLocaleString('fa-IR')} از ۱۰۰۰</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">ورودهای اخیر</h2>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>{user?.User?.LastIP}</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>


            <Profile isOpen={profile}
                user={user?.User}
                onClose={refreshProfile}
                title="ویرایش پروفایل" />
            {showInvoiceModal && (
                <InvoiceModal
                    onClose={() => setShowInvoiceModal(false)}
                    invoice={selectedInvoice}
                />
            )}
        </div>
    );
}