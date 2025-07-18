import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { useNavigate, Link } from "react-router-dom";
import LaInput from "../components/LaInput";
import LaButton from "../components/LaButton";

function Checkout() {
    const navigate = useNavigate();
    const { items, itemCount, totalPrice } = useCart();
    const user = useSelector((state) => state.userLog) || {};

    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        paymentMethod: "online",
        sendAddress: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user?.User?.NidUser) {
            setFormData((prev) => ({
                ...prev,
                phone: user?.User?.tel || "",
                address: user?.User?.Address || ""
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.phone || !/^\d{11}$/.test(formData.phone))
            newErrors.phone = "شماره موبایل معتبر وارد کنید.";
        if (!formData.address)
            newErrors.address = "آدرس الزامی است.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // TODO: ارسال سفارش به سرور
        console.log("ارسال سفارش:", formData);

        // شبیه‌سازی ثبت موفق
        navigate("/success");
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">تسویه حساب</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {!user?.User?.NidUser && (
                        <>
                            <div className="bg-yellow-50 p-3 rounded-md border text-sm">
                                <p className="mb-2">
                                    برای پیگیری سفارشات بهتر است وارد حساب شوید.
                                </p>
                                <Link to="/logging" className="text-blue hover:underline">
                                    ورود / ثبت‌نام
                                </Link>
                            </div>
                        </>
                    )}

                    <LaInput
                        label="شماره موبایل"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="مثلاً 09123456789"
                    />
                    {errors.phone && <p className="text-red text-sm">{errors.phone}</p>}

                    <LaInput
                        label="آدرس دریافت سفارش"
                        name="sendAddress"
                        value={formData.sendAddress}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="font-medium block mb-2">روش پرداخت</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="online">پرداخت آنلاین</option>
                            <option value="transfer">کارت به کارت</option>
                        </select>
                    </div>

                    {/* نمای متفاوت بر اساس نوع پرداخت */}
                    {formData.paymentMethod === "transfer" && (
                        <div className="bg-blue-50 border border-blue-300 text-sm text-gray-800 p-4 rounded-md mt-2">
                            <p>لطفاً مبلغ را به شماره کارت زیر واریز کرده و رسید را از طریق واتساپ  (09050962205) ارسال نمایید:</p>
                            <p className="font-bold mt-2">6104-3389-4399-8654 (بانک ملت)</p>
                            <p className="font-bold mt-2">6037-9917-1967-0923 (بانک ملی)</p>
                            <p className="font-bold mt-2">سید محمدامین موسوی</p>
                        </div>
                    )}

                    {formData.paymentMethod === "online" && (
                        <div className="text-sm text-green-700 border border-green-300 bg-green-50 p-3 rounded-md mt-2">
                            پس از ثبت سفارش به درگاه پرداخت هدایت می‌شوید.
                        </div>
                    )}
                </div>

                {/* خلاصه سبد خرید */}
                <div className="border rounded p-4 bg-gray-50 h-fit">
                    <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
                    {items.length === 0 ? (
                        <p>سبد خرید شما خالی است.</p>
                    ) : (
                        <ul className="space-y-2 text-sm">
                            {items.map((item) => (
                                <li key={item.NidProduct} className="flex justify-between">
                                    <span>{item.Title}</span>
                                    <span>{Number(item.Price).toLocaleString()} تومان</span>
                                </li>
                            ))}
                            <hr className="my-2" />
                            <li className="flex justify-between font-bold">
                                <span>جمع کل</span>
                                <span>{Number(totalPrice).toLocaleString()} تومان</span>
                            </li>
                            <li>
                                <span>تعداد اقلام: </span>
                                {itemCount}
                            </li>
                        </ul>
                    )}

                    <LaButton
                        type="submit"
                        variant="primary"
                        className="w-full mt-6"
                        disabled={items.length === 0}
                    >
                        ثبت سفارش
                    </LaButton>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
