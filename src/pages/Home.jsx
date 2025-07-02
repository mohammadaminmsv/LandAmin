import React from "react";
import MySlider from "../components/MySlider";
import ScrollBar from "../components/ScrollBar";
import LaButton from "../components/LaButton";
import LaInput from "../components/LaInput";

const sliders1 = [
    { image: "/images/slidershow/slide1.png", caption: "🎉 جشنواره فروش تابستانی" },
    { image: "/images/slidershow/laptop.png", caption: "⚡️ تخفیف ویژه لپ‌تاپ‌ها" },
    { image: "/images/slidershow/transport.png", caption: "🚚 ارسال رایگان به سراسر کشور" },
];
const sliders2 = [
    { image: "/images/slidershow/dell.png" },
    { image: "/images/slidershow/hotsale.png" },
    { image: "/images/slidershow/expo.png" },
];

const sliders3 = [
    { image: "/images/slidershow/landamin.png" },
    { image: "/images/slidershow/inside.png" },
    { image: "/images/slidershow/land.png" },
];


const brands = [
    { image: "/images/brands/intel-logo.png" },
    { image: "/images/brands/Amd-logo.png" },
    { image: "/images/brands/nvidia-logo.png" },
    { image: "/images/brands/asus-logo.png" },
    { image: "/images/brands/gigabyte-logo.png" },
    { image: "/images/brands/cicco-logo.jpg" },
    { image: "/images/brands/logo.svg" },
    { image: "/images/brands/apple-logo.png" },
];

const features = [
    { image: "/images/why/transport.png", text: "ارسال سریع به سراسر کشور" },
    { image: "/images/why/images.png", text: "تضمین اصالت کالا" },
    { image: "/images/why/sales-icon.png", text: "پشتیبانی ۲۴ ساعته" },
    { image: "/images/why/marketingservices.png", text: "خدمات پس از خرید" },
];

const categories = [
    { title: "کارت گرافیک", image: "/images/category/eforce-logo.png" },
    { title: "پردازنده", image: "/images/category/procces-logo.png" },
    { title: "مادربرد", image: "/images/category/motherboard-logo.png" },
    { title: "رم و حافظه", image: "/images/category/ram-logo.png" },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
            {/* اسلایدشو اول */}
            <div className="grid grid-cols-1 w-full gap-4 my-10">
                <MySlider slides={sliders3} />
            </div>

            <div className="grid grid-cols-8 gap-4 my-10">
                <div className="col-span-5"><MySlider slides={sliders1} /></div>
                <div className="col-span-3"><MySlider slides={sliders2} /></div>
            </div>

            {/* جدیدترین‌ها */}
            <section className="my-20 bg-gold p-10 rounded-lg">
                <h2 className="text-3xl  font-bold mb-4 text-center">جدیدترین محصولات</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                            <img
                                src={`/images/product${i}.jpg`}
                                alt="product"
                                className="w-full h-32 object-cover mb-2 rounded"
                            />
                            <h3 className="font-semibold">محصول #{i}</h3>
                            <p className="text-sm text-gray-500">توضیح کوتاه محصول</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* تخفیف‌ها */}
            <section className="my-20">
                <h2 className="text-xl font-bold mb-4 text-center text-red-600">
                    پیشنهادات ویژه و تخفیف‌ها
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-xl border border-red-200 shadow text-center"
                        >
                            <img
                                src={`/images/discount${i}.jpg`}
                                alt="discount"
                                className="w-full h-32 object-cover mb-2 rounded"
                            />
                            <h3 className="font-semibold text-red-500">
                                محصول تخفیف‌دار #{i}
                            </h3>
                            <p className="text-sm text-gray-500">تا ۳۰٪ تخفیف ویژه</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* دسته‌بندی‌ها */}
            <section className="my-20">
                <h2 className="text-xl font-bold mb-4 text-center">دسته‌بندی‌ها</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col justify-between bg-white p-4 rounded-xl shadow text-center">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                width={200}
                                height={200}
                                className="w-full object-cover mb-2 rounded"
                            />
                            <h3 className="font-semibold">{cat.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* برندها */}
            <section className="my-20 text-center">
                <h2 className="text-xl font-bold mb-4 ">برندهای ما</h2>
                <ScrollBar brands={brands} />
            </section>

            {/* ثبت‌نام در خبرنامه */}
            <section className="bg-indigo-100 p-6 rounded-xl text-center my-20">
                <h2 className="text-lg font-semibold mb-2">عضویت در خبرنامه</h2>
                <p className="text-sm text-gray-600 mb-4">برای دریافت آخرین تخفیف‌ها و محصولات جدید، ایمیل خود را وارد کنید.</p>
                <input type="email" placeholder="ایمیل شما..." className="p-2 m-3 w-80 rounded-l border border-gray-300" />
                <LaButton variant="danger">عضویت</LaButton>
            </section>

            {/* ویژگی‌های خرید */}
            <section className="my-20">
                <h2 className="text-xl font-bold mb-4 text-center">
                    چرا از ما خرید کنید؟
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 flex flex-col justify-between rounded-xl shadow text-center text-sm text-gray-700"
                        >
                            <img
                                src={feature.image}
                                alt={feature.text}
                                width={200}
                                height={200}
                                className="w-full object-cover mb-2 rounded"
                            />
                            <p className="font-bold text-goldDark text-xl">
                            {feature.text}

                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
