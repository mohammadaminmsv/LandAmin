import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../hooks/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { nidProcess } from "../utils/Process";
import { NotiActions } from "../hooks/Notiaction";
import { mainUser } from "../hooks/userLoged";
import { loginUser } from "../services/Logging/loginUser";
import LaInput from "../components/LaInput";
import LaButton from "../components/LaButton";
import { LastLog } from "../services/Logging/LastLog";
import Captcha from "../components/Capcha";

const Logging = () => {
    const [formData, setFormData] = useState({
        EmailOrNationalCode: "",
        NidProc: `${nidProcess.logProc}`,
        Password: "",
    });
    const [error, setError] = useState("");
    // const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    // const handleCaptchaValidation = (status) => {
    //     setIsCaptchaValid(status);
    // };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            if (data.success) {
                console.log("data", data);
                localStorage.setItem("token", data.token);
                dispatch(
                    NotiActions.showNotification({
                        open: true,
                        message: `${data.message}`,
                        type: "success",
                    })
                );
                const infoLog = await LastLog(data.data.NidUser, data.token);
                console.log(infoLog);
                // در جایی که پاسخ لاگین را دریافت می‌کنید:
                dispatch(login({
                    token: data.data.token,
                    user: data.data.user // اگر می‌خواهید اطلاعات کاربر را هم ذخیره کنید
                }));
                dispatch(mainUser(data.data));
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message || "خطای ورود");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12" style={{ backgroundImage: `url("/images/loggingPoster.png")` }}>
            <div className="w-full max-w-md bg-white/90 shadow-xl rounded-2xl px-8 py-10 backdrop-blur-sm" dir="rtl" >
                <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
                    ورود به حساب کاربری
                </h2>

                {error && <p className="text-red text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <LaInput
                        type="text"
                        name="EmailOrNationalCode"
                        placeholder="ایمیل یا کد ملی"
                        value={formData.EmailOrNationalCode}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                    />
                    <LaInput
                        type="password"
                        name="Password"
                        placeholder="رمز عبور"
                        value={formData.Password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                    />
                    {/* <Captcha onValidate={handleCaptchaValidation} /> */}
                    <LaButton
                        type="submit"
                        variant='primary'
                    // disabled={!isCaptchaValid}

                    >
                        ورود
                    </LaButton>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    حساب کاربری ندارید؟{" "}
                    <Link to="/register" className="text-yellow-600 hover:underline font-medium">
                        ثبت‌نام کنید
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Logging;
