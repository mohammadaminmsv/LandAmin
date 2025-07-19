import { useEffect, useState } from "react";
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
import { updateUser } from "../services/SignUp/updateUser";

function Profile({ isOpen, onClose, title, user }) {

    if (!isOpen) return null;
    const [formData, setFormData] = useState({ ...user, Password: "", rePassword: "" });
    const [errors, setErrors] = useState({});
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    const handleCaptchaValidation = (status) => {
        setIsCaptchaValid(status);
    };
    useEffect(() => {
        setFormData({ ...user, Password: "", rePassword: "" });
    }, [user]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.Name.trim()) newErrors.Name = "نام نباید خالی باشد.";
        if (!formData.LastName.trim())
            newErrors.LastName = "نام خانوادگی نباید خالی باشد.";
        if (!formData.Email.includes("@"))
            newErrors.Email = "ایمیل معتبر وارد کنید.";
        if (isNaN(formData.Age) || formData.Age <= 0)
            newErrors.Age = "سن باید عددی و بزرگتر از صفر باشد.";
        if (!/^\d{10}$/.test(formData.NationalCode))
            newErrors.NationalCode = "کد ملی باید ۱۰ رقم عددی باشد.";
        if (!/^\d{11}$/.test(formData.tel))
            newErrors.tel = " شماره تلفن باید 11 رقم عددی باشد.";
        if (formData.Password.length < 6)
            newErrors.Password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
        if (formData.Password !== formData.rePassword)
            newErrors.rePassword = "رمز عبور و تکرار آن یکسان نیست.";

        setErrors(newErrors);
        console.log(errors);

        if (errors) {
            return false
        } else {
            return true
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        validate()
        if (Object.values(errors).some(val => val !== null && val !== undefined && val !== "")) return;
        try {
            const data = await updateUser(formData, formData.NidUser);

            dispatch(
                NotiActions.showNotification({
                    open: true,
                    message: `${data.message}`,
                    type: "success",
                })
            );
            if (data.success) {
                localStorage.setItem("token", data.token);

                dispatch(login({
                    token: data.token,
                    user: data.data
                }));

                dispatch(mainUser(data.data));

                dispatch(NotiActions.showNotification({
                    open: true,
                    message: `${data.message}`,
                    type: "success",
                }));

                onClose();

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
        <div className="fixed  inset-0 z-10 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-xs">
            <div className="bg-white mt-20 rounded-xl w-full max-w-2xl p-6 shadow-xl relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    ×
                </button>
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 sm:gap-6">

                            <div>
                                <label>سن</label>
                                <LaInput
                                    type="number"
                                    name="Age"
                                    placeholder="سن"
                                    value={formData.Age}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                                />
                            </div>
                            <div>
                                <label>نام</label>
                                <LaInput
                                    type="text"
                                    name="Name"
                                    placeholder="نام"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                                />
                            </div>
                            <div>
                                <label>نام خانوادگی</label>
                                <LaInput
                                    type="text"
                                    name="LastName"
                                    placeholder="نام خانوادگی"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                                />
                            </div>

                        </div>

                        <div>
                            <label>آدرس</label>
                            <LaInput
                                type="text"
                                name="Address"
                                placeholder="آدرس"
                                value={formData.Address}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                            <div>
                                <label>رمز عبور</label>
                                <LaInput
                                    type="password"
                                    name="Password"
                                    placeholder="رمز عبور"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                                />
                            </div>
                            <div>
                                <label>تکرار رمز عبور</label>
                                <LaInput
                                    type="password"
                                    name="rePassword"
                                    placeholder="تکرار رمز عبور"
                                    value={formData.rePassword}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                                />
                            </div>

                        </div>
                        {errors.NationalCode && (
                            <p className="text-red font-bold  text-sm my-1">
                                {errors.NationalCode}
                            </p>
                        )}
                        {errors.tel && (
                            <p className="text-red font-bold  text-sm my-1">
                                {errors.tel}
                            </p>
                        )}
                        {errors?.Name && (
                            <p className="text-red font-bold  text-sm my-1">{errors?.Name}</p>
                        )}
                        {errors.Lastname && (
                            <p className="text-red font-bold  text-sm my-1">{errors.Lastname}</p>
                        )}
                        {errors.Password && (
                            <p className="text-red font-bold  text-sm my-1">{errors.Password}</p>
                        )}
                        {errors.rePassword && (
                            <p className="text-red font-bold  text-sm my-1">{errors.rePassword}</p>
                        )}
                        {errors.Age && (
                            <p className="text-red font-bold  text-sm my-1">{errors.Age}</p>
                        )}
                        {errors.Email && (
                            <p className="text-red font-bold  text-sm my-1">{errors.Email}</p>
                        )}
                        <Captcha onValidate={handleCaptchaValidation} />
                        <LaButton
                            type="submit"
                            variant="primary"
                            disabled={!isCaptchaValid}
                        >
                            ویرایش
                        </LaButton>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Profile
