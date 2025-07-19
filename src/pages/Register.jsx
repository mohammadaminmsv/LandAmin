import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { nidProcess } from "../utils/Process";
import { NotiActions } from "../hooks/Notiaction";
import LaInput from "../components/LaInput";
import LaButton from "../components/LaButton";
import { registerUser } from "../services/SignUp/registerUser";
import { login } from "../hooks/authSlice";
import { mainUser } from "../hooks/userLoged";
import { LastLog } from "../services/Logging/LastLog";
import Captcha from "../components/Capcha";
import { createDashboard } from "../services/Dashboard/createDashboard";

const Register = () => {
    const [formData, setFormData] = useState({
        Email: "",
        NidProc: `${nidProcess.regProc}`,
        Password: "",
        Name: "",
        LastName: "",
        Age: "",
        NationalCode: "",
        tel: "",
        Address: "",
        rePassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    const handleCaptchaValidation = (status) => {
        setIsCaptchaValid(status);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.Name.trim()) newErrors.Name = "نام نباید خالی باشد.";
        if (!formData.LastName.trim()) newErrors.LastName = "نام خانوادگی نباید خالی باشد.";
        if (!formData.Email.includes("@")) newErrors.Email = "ایمیل معتبر وارد کنید.";
        if (isNaN(formData.Age) || formData.Age <= 0) newErrors.Age = "سن باید عددی و بزرگتر از صفر باشد.";
        if (!/^\d{10}$/.test(formData.NationalCode)) newErrors.NationalCode = "کد ملی باید ۱۰ رقم عددی باشد.";
        if (!/^\d{11}$/.test(formData.tel)) newErrors.tel = "شماره تلفن باید 11 رقم عددی باشد.";
        if (formData.Password.length < 6) newErrors.Password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
        if (formData.Password !== formData.rePassword) newErrors.rePassword = "رمز عبور و تکرار آن یکسان نیست.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            console.log("فرم نامعتبر است");
            return;
        }
        try {
            const data = await registerUser(formData);

            dispatch(
                NotiActions.showNotification({
                    open: true,
                    message: `${data.message}`,
                    type: "success",
                })
            );
            if (data.success) {
                dispatch(
                    NotiActions.showNotification({
                        open: true,
                        message: `${data.message}`,
                        type: "success",
                    })
                );

                navigate("/dashboard");
                try {
                    const dashboard = await createDashboard(data.data[0].NidUser);
                    if (dashboard.success) {
                        console.log(data);
                        localStorage.setItem("token", data.token);

                        dispatch(login({
                            token: data.token,
                            user: data.data[0],
                            dashboard: dashboard.data
                        }));
                        dispatch(mainUser({
                            dashboard: dashboard.data,
                            user: data.data[0]
                        }));
                    }

                } catch (error) {
                    dispatch(
                        NotiActions.showNotification({
                            open: true,
                            message: `${error.message}`,
                            type: "error",
                        })
                    );
                }

            }
        } catch (error) {
            dispatch(
                NotiActions.showNotification({
                    open: true,
                    message: `${error.message}`,
                    type: "error",
                })
            );
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12" style={{ backgroundImage: `url("/images/loggingPoster.png")` }}>
            <div className="w-full max-w-2xl bg-white/90 shadow-xl rounded-2xl px-8 py-10 backdrop-blur-sm" dir="rtl" >
                <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
                    ثبت نام کنید
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-6">
                        <LaInput
                            type="number"
                            name="NationalCode"
                            placeholder="کد ملی"
                            value={formData.NationalCode}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                        <LaInput
                            type="number"
                            name="tel"
                            placeholder="تلفن همراه"
                            value={formData.tel}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />


                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-6">
                        <LaInput
                            type="Email"
                            name="Email"
                            placeholder="ایمیل"
                            value={formData.Email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />
                        <LaInput
                            type="number"
                            name="Age"
                            placeholder="سن"
                            value={formData.Age}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                        <LaInput
                            type="text"
                            name="Name"
                            placeholder="نام"
                            value={formData.Name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                        <LaInput
                            type="text"
                            name="LastName"
                            placeholder="نام خانوادکی"
                            value={formData.LastName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                    </div>


                    <LaInput
                        type="text"
                        name="Address"
                        placeholder="آدرس"
                        value={formData.Address}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                        <LaInput
                            type="password"
                            name="Password"
                            placeholder="رمز عبور"
                            value={formData.Password}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                        <LaInput
                            type="password"
                            name="rePassword"
                            placeholder="تکرار رمز عبور"
                            value={formData.rePassword}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                        />

                    </div>
                    {errors.NationalCode && (
                        <p className="text-red text-sm mt-1">
                            {errors.NationalCode}
                        </p>
                    )}
                    {errors.tel && (
                        <p className="text-red text-sm mt-1">
                            {errors.tel}
                        </p>
                    )}
                    {errors?.Name && (
                        <p className="text-red text-sm mt-1">{errors?.Name}</p>
                    )}
                    {errors.Lastname && (
                        <p className="text-red text-sm mt-1">{errors.Lastname}</p>
                    )}
                    {errors.Password && (
                        <p className="text-red text-sm mt-1">{errors.Password}</p>
                    )}
                    {errors.rePassword && (
                        <p className="text-red text-sm mt-1">{errors.rePassword}</p>
                    )}
                    {errors.Age && (
                        <p className="text-red text-sm mt-1">{errors.Age}</p>
                    )}
                    {errors.Email && (
                        <p className="text-red text-sm mt-1">{errors.Email}</p>
                    )}
                    <Captcha onValidate={handleCaptchaValidation} />
                    <LaButton
                        type="submit"
                        variant="primary"
                        disabled={!isCaptchaValid}
                    >
                        ثبت‌ نام
                    </LaButton>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    حساب کاربری دارید؟{" "}
                    <Link to="/logging" className="text-yellow-600 hover:underline font-medium">
                        ورود کنید
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
