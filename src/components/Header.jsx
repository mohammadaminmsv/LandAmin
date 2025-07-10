import { FaSearch, FaShoppingCart, FaBars, FaChevronDown } from 'react-icons/fa';
import LaButton from './LaButton';
import LaInput from './LaInput';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategory } from '../services/Category/getCategory';
import { useCart } from '../hooks/useCart';
import { getBrands } from '../services/Brands/getBrands';
import { getAllProduct } from '../services/Product/getAllProduct';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllProduct();
            if (res.success) setProducts(res.data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            setFilteredResults([]);
            return;
        }

        const filtered = products.filter((item) =>
            item.Title?.toLowerCase().includes(query) ||
            item.Brand?.toLowerCase().includes(query) ||
            item.Category?.toLowerCase().includes(query)
        );

        setFilteredResults(filtered);
    }, [searchQuery, products]);

    const { itemCount } = useCart();

    useEffect(() => {
        setCartItemsCount(itemCount);
    }, [itemCount]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState({
        category: false,
        brand: false,
    });
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const getAllCategory = async () => {
        try {
            const data = await getCategory();
            if (data.success) {
                setCategories(data.data)
            }
        } catch (err) {
            console.log(err);
        }

    };
    const getAllBrands = async () => {
        try {
            const data = await getBrands();
            if (data.success) {

                setBrands(data.data.sort((a, b) => a.sortId - b.sortId))
            }
        } catch (err) {
            console.log(err);
        }

    };
    const handleBtnMobile = (type) => {
        setMobileMenuOpen((prev) => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    useEffect(() => {

        return () => {
            getAllCategory()
            getAllBrands()
        };
    }, []);
    return (
        <header className="w-full font-vazir shadow-md static md:sticky top-0 z-50 bg-white">
            {/* ردیف بالا */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-2 md:gap-0">
                {/* لوگو */}
                <Link to=''>
                    <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                        <img src="/aminlogo.png" alt="Landamin Logo" className="h-12 w-auto" />
                    </div>
                </Link>
                {/* جستجو */}
                <div className="relative w-full md:flex-1 max-w-xl px-2 md:px-6">
                    <LaInput
                        type="text"
                        placeholder="جست‌وجو میان کالا، برند یا دسته‌بندی..."
                        icon={FaSearch}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Dropdown نتایج */}
                    {searchQuery && (
                        <div className="absolute -mt-3 left-0 top-full w-full bg-white border border-gray-300 shadow-lg rounded-b-xl z-50 overflow-hidden">
                            {filteredResults.length > 0 ? (
                                <>
                                    {filteredResults.slice(0, 3).map((item) => (
                                        <div
                                            key={item.NidProduct}
                                            onClick={() => {
                                                navigate(`/product/${item.NidProduct}`);
                                                setSearchQuery("");
                                                setFilteredResults([]);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                                        >
                                            <img
                                                src={item.picturesURL || "https://via.placeholder.com/60"}
                                                alt={item.Title}
                                                className="w-14 h-14 object-contain rounded border"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">
                                                    {item.Title}
                                                </h4>
                                                <div className="text-xs text-gray-600 flex justify-between">
                                                    <span>قیمت: {Number(item.Price).toLocaleString()} تومان</span>
                                                    <span>موجودی: {item.Stock ?? 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredResults.length > 3 && (
                                        <div
                                            onClick={() => {
                                                navigate(`/search?query=${encodeURIComponent(searchQuery)}`, {
                                                    state: { results: filteredResults },
                                                });
                                                setSearchQuery("");
                                                setFilteredResults([]);
                                            }}
                                            className="text-center text-sm text-blue-600 hover:text-blueDark py-3 border-t border-gray-100 cursor-pointer"
                                        >
                                            مشاهده همه نتایج ({filteredResults.length})
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="p-4 text-sm text-center text-gray space-y-2">
                                    <p>نتیجه‌ای یافت نشد.</p>
                                    <p
                                        className="text-blue hover:text-blueDark cursor-pointer font-medium"
                                        onClick={() => {
                                            navigate("/productsAll");
                                            setSearchQuery("");
                                            setFilteredResults([]);
                                        }}
                                    >
                                        مشاهده همه محصولات
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                </div>


                {/* ورود + سبد خرید */}
                <div className="flex items-center justify-center md:justify-end  md:w-auto gap-4">
                    {isLoggedIn ? (
                        <div className='flex gap-2'>
                            <Link to='dashboard'>
                                <LaButton variant="primary">
                                    داشبورد
                                </LaButton>
                            </Link>
                            <LaButton variant="danger" onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                            }}>
                                خروج
                            </LaButton>

                        </div>

                    ) : (
                        <Link to='/logging'>
                            <LaButton variant="primary">
                                ورود / ثبت‌نام
                            </LaButton>
                        </Link>

                    )}
                    <Link to='cart' className="relative group">
                        <FaShoppingCart className={`
    text-2xl text-orange 
    transition-all duration-300 
    transform group-hover:scale-110
  `} />

                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 group-hover:scale-125">

                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                    <button className="md:hidden max-w-40" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars className="text-xl text-goldDark" />
                    </button>
                </div>
            </div>

            {/* منوی دسکتاپ */}
            <nav className="hidden md:block bg-white relative">
                <ul className="flex justify-center gap-10 text-md text-grayDark p-3">
                    <Link to='/'>
                        <li className="font-bold hover:text-gold cursor-pointer">صفحه اصلی</li>
                    </Link>
                    <Link to='/productsAll'>
                        <li className="hover:text-gold cursor-pointer">تمامی محصولات</li>
                    </Link>

                    {/* دسته‌بندی با dropdown هاور */}
                    {/* دسته‌بندی با dropdown هاور */}
                    <li className="group relative cursor-pointer hover:text-goldDark">
                        <div className="flex items-center gap-1">
                            دسته‌بندی <FaChevronDown className="text-xs mt-0.5" />
                        </div>
                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 w-[500px] p-4 grid grid-cols-2 gap-8">

                            {/* ستون ۱: دسته قطعات */}
                            <div>
                                <div className="font-bold text-grayDark mb-2">دسته قطعات</div>
                                <ul className="space-y-1 text-sm">
                                    {categories.map((cat) => (
                                        <li key={cat.PartTypeID}>
                                            <Link
                                                to={`/category/${encodeURIComponent(cat.Name)}`}
                                                className="hover:text-blue transition"
                                            >
                                                {cat.Name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ستون ۲: برندها */}
                            <div>
                                <div className="font-bold text-grayDark mb-2">برندها</div>
                                <ul className="space-y-1 text-sm">
                                    {brands.map((bra) => (
                                        <li key={bra.NidBrand}>
                                            <Link
                                                to={`/brand/${encodeURIComponent(bra.Name)}`}
                                                className="hover:text-blue transition"
                                            >
                                                {bra.Name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>


                    <Link to='/information'><li className="hover:text-gold cursor-pointer">درباره ما</li></Link>
                    <Link to='/contact'><li className="hover:text-gold cursor-pointer">اطلاعات تماس</li></Link>
                    <Link to='/discount'><li className="hover:text-gold cursor-pointer">تخفیفات</li></Link>

                </ul>
            </nav>

            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden flex flex-row">

                    {/* لایه خاکستری نیمه‌شفاف برای بستن */}

                    {/* منوی موبایل سمت راست (عرض 50%) */}
                    <div className="w-1/2  max-w-xs bg-white h-[calc(100vh)] p-5 shadow-lg overflow-y-auto">
                        <ul className="flex flex-col space-y-4 text-md text-grayDark">
                            <Link to="/"><li className="font-bold">صفحه اصلی</li></Link>
                            <Link to="/productsAll"><li className="font-bold">تمامی محصولات</li></Link>
                            <Link to="/information"><li>درباره ما</li></Link>
                            <Link to="/contact"><li>اطلاعات تماس</li></Link>
                            <Link to="/discount"><li>تخفیفات</li></Link>

                            {/* زیرمنوی قطعات */}
                            <li className="mt-2 space-y-1">
                                <button
                                    className="flex justify-between text-white items-center w-full font-medium bg-green p-2 rounded-md"
                                    onClick={() => handleBtnMobile("category")}
                                >
                                    قطعات
                                    <FaChevronDown className={`transform transition ${mobileMenuOpen.category ? 'rotate-180' : ''}`} />
                                </button>

                                {mobileMenuOpen.category && (
                                    <ul className="mt-2 space-y-1 pr-2 text-sm text-grayDark  font-bold">
                                        {categories.map((cat) => (
                                            <li key={cat.PartTypeID}>
                                                <Link
                                                    to={`/category/${encodeURIComponent(cat.Name)}`}
                                                    className="block px-2 py-1 hover:text-orange"
                                                >
                                                    {cat.Name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button
                                    className="flex justify-between text-white items-center w-full font-medium bg-green p-2 rounded-md"
                                    onClick={() => handleBtnMobile("brand")}
                                >
                                    برند ها
                                    <FaChevronDown className={`transform transition ${mobileMenuOpen.brand ? 'rotate-180' : ''}`} />
                                </button>
                                {mobileMenuOpen.brand && (
                                    <ul className="mt-2 space-y-1 pr-2 text-sm text-grayDark font-bold">
                                        {brands.map((bra) => (
                                            <li key={bra.NidBrand}>
                                                <Link
                                                    to={`/brand/${encodeURIComponent(bra.Name)}`}
                                                    className="block px-2 py-1 hover:text-orange"
                                                >
                                                    {bra.Name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div
                        className="flex-1 bg-black bg-opacity-30 backdrop-blur-sm"
                        onClick={() => setMenuOpen(false)}
                    ></div>

                </div>
            )}

        </header>
    );
}

export default Header;
