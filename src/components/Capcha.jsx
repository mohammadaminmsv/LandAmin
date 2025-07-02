import React, { useEffect, useState } from "react";
import LaInput from "./LaInput";
import LaButton from "./LaButton";

const Captcha = ({ onValidate }) => {
    const [captchaText, setCaptchaText] = useState("");
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let text = "";
        for (let i = 0; i < 5; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(text);
        setInput("");
        setError("");
        onValidate(false);
    };

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        setInput(value);

        if (value === captchaText) {
            setError("");
            onValidate(true);
        } else {
            setError("کد وارد شده صحیح نیست");
            onValidate(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 gap-2 w-full">
            {/* کپچا */}
            <div className="flex items-start gap-2">
                <span className="bg-white border-gold border-2 px-4 py-2 rounded-md font-mono tracking-wider text-base text-gray-700 select-none">
                    {captchaText}
                </span>
                <LaButton variant="secondary" onClick={generateCaptcha}>
                    تغییر کد
                </LaButton>
            </div>

            {/* ورودی و پیام خطا */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-2">
                <LaInput
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="کد را وارد کنید"
                />

                {error && input !== "" && (
                    <p className="text-red font-bold text-sm sm:w-auto w-full">{error}</p>
                )}
            </div>
        </div>

    );
};

export default Captcha;
