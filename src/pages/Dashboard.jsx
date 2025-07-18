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
    const token = useSelector((state) => state.auth) || {};
    const [user, setUser] = useState(User);
    const [profile, serProfile] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [orders, setOrders] = useState();

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


    const fetchOrders = async () => {
        try {
            const data = await getAllOrder(user.User.NidUser);
            if (data.success) {
                setOrders(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        console.log(user);
        if (token && !user.User.NidUser) {
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
            <h1 className="text-2xl font-bold"> داشبورد کاربر {user.User.Name} {user.User.LastName} </h1>

            {/* آمار کلیدی */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><CardContent><p className="text-gray-500">سفارشات شما</p><p className="text-2xl font-bold">56</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">در حال پردازش</p><p className="text-2xl font-bold">5</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">جمع خرید</p><p className="text-2xl font-bold">8,450,000 تومان</p></CardContent></Card>
                <Card><CardContent><p className="text-gray-500">موجودی کیف پول</p><p className="text-2xl font-bold text-green-600">0 تومان</p></CardContent></Card>
            </div>

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
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">امتیاز فعلی: ۷۰۰ از ۱۰۰۰</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-2">ورودهای اخیر</h2>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>{User.User.LastIP}</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>


            <Profile isOpen={profile}
                onClose={() => serProfile(false)}
                user={user.User}
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