import React from "react";

function Footer() {
    return (
        <footer className="bg-white text-gray-700 text-sm border-t">
            {/* بخش بالا */}
            <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <h3 className="text-base font-bold mb-3">خرید از لندامین</h3>
                    <ul className="space-y-2">
                        <li>لباس مردانه</li>
                        <li>خرید کیف و کفش</li>
                        <li>محصولات آرایشی</li>
                        <li>خرید طلا و ساعت</li>
                        <li>خرید لوازم خانه</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3">خدمات مشتریان</h3>
                    <ul className="space-y-2">
                        <li>پرسش‌های متداول</li>
                        <li>شرایط بازگشت</li>
                        <li>راهنمای خرید</li>
                        <li>قوانین و مقررات</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3">اطلاعات لندامین</h3>
                    <ul className="space-y-2">
                        <li>درباره ما</li>
                        <li>تماس با ما</li>
                        <li>فرصت‌های شغلی</li>
                        <li>همکاری با ما</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-base font-bold mb-3">پشتیبانی</h3>
                    <p className="mb-1">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
                    <p>تلفن: 021-12345678</p>
                    <p>ایمیل: support@landamin.com</p>
                </div>
            </div>

            {/* خط جداکننده */}
            <div className="border-t"></div>

            {/* بخش پایین */}
            <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-xs text-center md:text-right mb-2 md:mb-0">کلیه حقوق این وب‌سایت متعلق به لندامین است.</p>
                <div className="flex items-center gap-4">
                    <img src="/images/enamad.png" alt="نماد اعتماد" className="h-10" />
                    <img src="/images/samandehi.png" alt="ساماندهی" className="h-10" />
                    <img src="/images/logo3.png" alt="نشان سوم" className="h-10" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
