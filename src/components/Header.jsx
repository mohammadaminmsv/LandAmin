import { FaSearch, FaShoppingCart, FaBars, FaChevronDown } from 'react-icons/fa';
import LaButton from './LaButton';
import LaInput from './LaInput';
import { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

    const categories = ['قطعات کامپیوتر', 'لوازم یدکی خودرو', 'کابل و مبدل', 'سخت‌افزار', 'لوازم جانبی'];

    return (
        <header className="w-full font-vazir shadow-md sticky top-0 z-50 bg-white">
            {/* ردیف بالا */}
            <div className="flex flex-col md:flex-row items-center justify-between p-2 gap-2 md:gap-0">
                {/* لوگو */}
                <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <img src="/aminlogo.png" alt="Landamin Logo" className="h-12 w-auto" />
                </div>

                {/* جستجو */}
                <div className="w-full md:flex-1 max-w-xl px-2 md:px-6">
                    <LaInput
                        type="text"
                        placeholder="جست‌وجو میان هزاران برند و صدها هزار کالا"
                        icon={FaSearch}
                        className="bg-grayLight"
                    />
                </div>

                {/* ورود + سبد خرید */}
                <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-4">
                    <LaButton variant="primary">ورود / ثبت‌نام</LaButton>
                    <FaShoppingCart className="text-2xl text-grayDark" />
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars className="text-xl text-grayDark" />
                    </button>
                </div>
            </div>

            {/* منوی دسکتاپ */}
            <nav className="hidden md:block bg-white relative">
                <ul className="flex justify-center gap-10 text-sm text-grayDark py-3">
                    <li className="font-bold hover:text-gold cursor-pointer">صفحه اصلی</li>

                    {/* دسته‌بندی با dropdown هاور */}
                    <li className="group relative cursor-pointer hover:text-gold">
                        <div className="flex items-center gap-1">
                            دسته‌بندی <FaChevronDown className="text-xs mt-0.5" />
                        </div>
                        <ul className="absolute top-full right-0 bg-white border border-gray-200 rounded-md shadow-md mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-48">
                            {categories.map((item) => (
                                <li
                                    key={item}
                                    className="px-4 py-2 hover:bg-gray-100 text-right whitespace-nowrap"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className="hover:text-gold cursor-pointer">درباره ما</li>
                    <li className="hover:text-gold cursor-pointer">اطلاعات تماس</li>
                    <li className="hover:text-gold cursor-pointer">تخفیفات</li>
                </ul>
            </nav>

            {/* منوی موبایل */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white px-4">
                    <ul className="flex flex-col space-y-3 text-sm text-grayDark">
                        <li>صفحه اصلی</li>

                        {/* دسته‌بندی آکاردئونی */}
                        <li>
                            <button
                                className="flex justify-between items-center w-full font-medium"
                                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                            >
                                دسته‌بندی
                                <FaChevronDown className={`transform transition ${mobileCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {mobileCategoryOpen && (
                                <ul className="mt-2 space-y-1 pr-2 text-sm text-gray-600">
                                    {categories.map((cat) => (
                                        <li key={cat} className="pl-2 border-r-2 border-gold">{cat}</li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li>درباره ما</li>
                        <li>اطلاعات تماس</li>
                        <li>تخفیفات</li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;
