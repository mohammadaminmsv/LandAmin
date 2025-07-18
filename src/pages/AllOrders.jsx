import React, { useEffect, useState } from "react";
import InvoiceModal from "../components/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import LaButton from "../components/LaButton";
import Profile from "./Profile";
import { getAllOrder } from "../services/Orders/getAllOrder"

export default function AllOrders() {
    const user = useSelector((state) => state.userLog) || {};
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [orders, setOrders] = useState();
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
    const handleShowInvoice = (orderId) => {
        const order = orders.find(o => o.NidOrder === orderId);
        if (order) {
            setSelectedInvoice(order);
            setShowInvoiceModal(true);
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending':
                return <span className="text-yellow-500 font-bold">در حال پرداخت</span>;
            case 'paid':
                return <span className="text-green font-bold">پرداخت شده</span>;
            case 'canceled':
                return <span className="text-red font-bold">لغو شده</span>;
            case 'shipped':
                return <span className="text-blue font-bold">ارسال شده</span>;
            default:
                return <span className="text-gray">نامشخص</span>;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">همه سفارش‌ها</h2>
            </div>

            <ul className="divide-y">
                {orders ? orders.map(order => (
                    <li key={order.NidOrder} className="flex justify-between py-2">
                        <div className="flex gap-2">
                            <span> کل مبلغ: {order?.TotalPrice}</span>
                            <span>ارسال به: {order.sendAddress}</span>
                            <span>وضعیت: {getStatusLabel(order.Status)}</span>
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
            {showInvoiceModal && (
                <InvoiceModal
                    onClose={() => setShowInvoiceModal(false)}
                    invoice={selectedInvoice}
                />
            )}
        </div>
    );
}
