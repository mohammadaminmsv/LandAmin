import React, { useEffect, useState } from "react";
import MySlider from "../components/MySlider";
import ScrollBar from "../components/ScrollBar";
import LaButton from "../components/LaButton";
import { getAllProduct } from "../services/Product/getAllProduct";
import { getBrands } from "../services/Brands/getBrands";
import { getCategory } from "../services/Category/getCategory";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollProductBar
    from "../components/ScrollProductBar";


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

const features = [
    { image: "/images/why/transport.png", text: "ارسال سریع به سراسر کشور" },
    { image: "/images/why/images.png", text: "تضمین اصالت کالا" },
    { image: "/images/why/sales-icon.png", text: "پشتیبانی ۲۴ ساعته" },
    { image: "/images/why/marketingservices.png", text: "خدمات پس از خرید" },
];

const Home = () => {
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return <FaArrowRight className={`${className} text-black`} onClick={onClick} />;
    };

    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return <FaArrowLeft className={`${className} text-black`} onClick={onClick} />;
    };

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [prodRes, brandRes, catRes] = await Promise.all([
                    getAllProduct(12),
                    getBrands(12),
                    getCategory(12)
                ]);

                if (prodRes.success) setProducts(prodRes.data || []);
                if (brandRes.success) setBrands(brandRes.data || []);
                if (catRes.success) setCategories(catRes.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAll();
    }, []);

    const filteredProducts = products.filter(p => p.newProduct === 0);
    const newProducts = products.filter(p => p.newProduct === 1);
    const discountProducts = products.filter(p => p.discount > 0);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4 space-y-20">
            <div className="grid grid-cols-1 w-full gap-4">
                <MySlider slides={sliders3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className="col-span-5"><MySlider slides={sliders1} /></div>
                <div className="col-span-3"><MySlider slides={sliders2} /></div>
            </div>

            <section className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">محصولات ما</h2>
                {products.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                        <LoadingSpinner message="در حال بارگذاری محصولات..." />
                    </div>
                ) : (
                    <ScrollProductBar products={filteredProducts} />

                )}
            </section>

            <section className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4 text-red-600">پیشنهادات ویژه و تخفیف‌ها</h2>
                {products.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                        <LoadingSpinner message="در حال بارگذاری محصولات..." />
                    </div>
                ) : (
                    <ScrollProductBar products={discountProducts} />
                )}


            </section>

            <section className="bg-teal p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">جدیدترین محصولات</h2>
                {products.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                        <LoadingSpinner message="در حال بارگذاری محصولات..." />
                    </div>
                ) : (
                    <ScrollProductBar products={newProducts} />

                )}
            </section>

            <section className="text-center">
                <h2 className="text-xl font-bold mb-4 text-center">دسته‌بندی‌ها</h2>
                {categories.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                        <LoadingSpinner message="در حال بارگذاری محصولات..." />
                    </div>
                ) : (
                    <ScrollBar object={categories} />

                )}

            </section>

            <section className="text-center">
                <h2 className="text-xl font-bold mb-4">برندهای ما</h2>
                {categories.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-10">
                        <LoadingSpinner message="در حال بارگذاری محصولات..." />
                    </div>
                ) : (
                    <ScrollBar object={brands} />

                )}


            </section>

            <section className="bg-indigo-100 p-6 rounded-xl text-center">
                <h2 className="text-lg font-semibold mb-2">عضویت در خبرنامه</h2>
                <p className="text-sm text-gray-600 mb-4">برای دریافت آخرین تخفیف‌ها و محصولات جدید، ایمیل خود را وارد کنید.</p>
                <div className="flex flex-col text-center items-center gap-2 justify-center">
                    <input type="email" placeholder="ایمیل شما..." className="p-2 w-80 rounded-l border border-gray-300" />
                    <div className="w-96">
                        <LaButton variant="danger">عضویت</LaButton>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-center">چرا از ما خرید کنید؟</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 flex flex-col justify-between rounded-xl shadow text-center text-sm text-gray-700"
                        >
                            <img
                                src={feature.image}
                                alt={feature.text}
                                className="w-full h-32 object-contain mb-2"
                            />
                            <p className="font-bold text-tealDark text-lg">
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
