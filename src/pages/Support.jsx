import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaInbox } from "react-icons/fa";
import { getTicketsUser } from '../services/Ticket/getTicketsUser';
import { newTickets } from '../services/Ticket/newTickets';
import { formatDistanceToNow } from 'date-fns';

const Support = () => {
    const user = useSelector((state) => state.userLog) || {};
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ Title: "", Message: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchTickets = async () => {
        try {
            const res = await getTicketsUser(user.User.NidUser);
            if (res.success) {
                setTickets(res.data);
            }
        } catch (err) {
            console.error("خطا در دریافت تیکت‌ها:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!user.User?.NidUser) return;
        fetchTickets();
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        if (!form.Title.trim() || !form.Message.trim()) {
            setError("عنوان و پیام الزامی هستند.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const res = await newTickets(form, user.User.NidUser);
            if (res.success) {
                setForm({ Title: "", Message: "" });
                fetchTickets();
            }
        } catch (err) {
            setError("ثبت تیکت با خطا مواجه شد.", err);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-xl font-bold mb-6 text-center">تیکت‌های من</h1>

            {/* فرم ثبت تیکت جدید */}
            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-lg shadow p-5 mb-10 space-y-4"
            >
                <h2 className="font-bold text-gray-800 text-lg">ارسال تیکت جدید</h2>
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    placeholder="عنوان تیکت"
                    className="w-full border border-gray-300 rounded p-2"
                />

                <textarea
                    name="Message"
                    value={form.Message}
                    onChange={handleChange}
                    placeholder="متن پیام..."
                    rows={4}
                    className="w-full border border-gray-300 rounded p-2"
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-teal text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50"
                >
                    {submitting ? "در حال ارسال..." : "ارسال تیکت"}
                </button>
            </form>

            {/* لیست تیکت‌ها */}
            {loading ? (
                <p className="text-center">در حال بارگذاری...</p>
            ) : tickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
                    <FaInbox className="text-4xl mb-2" />
                    <p>تاکنون تیکتی ثبت نکرده‌اید.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.NidTicket}
                            className="bg-white shadow rounded-xl p-4 border border-gray-100"
                        >
                            <h3 className="font-bold text-lg text-blue mb-1">{ticket.Title}</h3>
                            <p className="text-grayDark whitespace-pre-wrap">{ticket.Message}</p>
                            <div className="text-sm text-gray mt-2">
                                ثبت‌شده:{" "}
                                {formatDistanceToNow(new Date(ticket.CreatedAt), { addSuffix: true })}
                            </div>
                            <div className="text-xs font-bold text-right mt-1">
                                وضعیت:{" "}
                                <span
                                    className={`px-2 py-0.5 rounded ${ticket.Status === "closed"
                                        ? "bg-red text-red-600"
                                        : "bg-green text-green-600"
                                        }`}
                                >
                                    {ticket.Status === "closed" ? "بسته‌شده" : "باز"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Support
