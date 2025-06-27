import React from "react";
import MySlider from "../components/MySlider";


const sliders = [
    "/images/pc1.jpg",
    "/images/pc2.jpg",
    "/images/pc3.jpg",
    "/images/pc4.jpg"
];

const brands = [
    { name: "Intel", image: "/images/brands/intel-logo.png" }, { name: "AMD", image: "/images/brands/intel-logo.png" }, { name: "NVIDIA", image: "/images/brands/intel-logo.png" }, { name: "ASUS", image: "/images/brands/intel-logo.png" }, { name: "Gigabyte", image: "/images/brands/intel-logo.png" }, { name: "MSI", image: "/images/brands/intel-logo.png" }
];

const features = [
    "ارسال سریع به سراسر کشور",
    "تضمین اصالت کالا",
    "پشتیبانی ۲۴ ساعته",
    "خدمات پس از خرید"
];

const categories = [
    { title: "کارت گرافیک", image: "/images/category-gpu.jpg" },
    { title: "پردازنده", image: "/images/category-cpu.jpg" },
    { title: "مادربرد", image: "/images/category-mb.jpg" },
    { title: "رم و حافظه", image: "/images/category-ram.jpg" }
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
            {/* اسلایدشو اول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {sliders.map((img, i) => (
                    <MySlider key={i} images={[img]} />
                ))}
            </div>

            {/* جدیدترین‌ها */}
            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 text-center">جدیدترین محصولات</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                            <img src={`/images/product${i}.jpg`} alt="product" className="w-full h-32 object-cover mb-2 rounded" />
                            <h3 className="font-semibold">محصول #{i}</h3>
                            <p className="text-sm text-gray-500">توضیح کوتاه محصول</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* تخفیف‌ها */}
            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 text-center text-red-600">پیشنهادات ویژه و تخفیف‌ها</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-red-200 shadow text-center">
                            <img src={`/images/discount${i}.jpg`} alt="discount" className="w-full h-32 object-cover mb-2 rounded" />
                            <h3 className="font-semibold text-red-500">محصول تخفیف‌دار #{i}</h3>
                            <p className="text-sm text-gray-500">تا ۳۰٪ تخفیف ویژه</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* دسته‌بندی‌ها */}
            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 text-center">دسته‌بندی‌ها</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                            <img src={cat.image} alt={cat.title} className="w-full h-32 object-cover mb-2 rounded" />
                            <h3 className="font-semibold">{cat.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* برندها */}
            <section className="mb-12 text-center">
                <h2 className="text-xl font-bold mb-4">برندهای ما</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {brands.map((brand, i) => (
                        <div key={i} className="bg-white px-6 py-3 rounded-full shadow text-sm font-medium">
                            <img src={brand.image}></img>
                            {brand.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* ثبت‌نام در خبرنامه */}
            <section className="bg-indigo-100 p-6 rounded-xl text-center mb-12">
                <h2 className="text-lg font-semibold mb-2">عضویت در خبرنامه</h2>
                <p className="text-sm text-gray-600 mb-4">برای دریافت آخرین تخفیف‌ها و محصولات جدید، ایمیل خود را وارد کنید.</p>
                <input type="email" placeholder="ایمیل شما..." className="p-2 rounded-l border border-gray-300" />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r">عضویت</button>
            </section>

            {/* ویژگی‌های خرید */}
            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 text-center">چرا از ما خرید کنید؟</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((text, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow text-center text-sm text-gray-700">
                            {text}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
