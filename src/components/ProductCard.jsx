import React from "react";
import { addToCartWithCheck } from "./CartThunks";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full max-h-[550px]">
            {/* ربان‌ها */}
            {product.newProduct != 0 && (
                <div className="absolute top-0 left-0 bg-greenDark text-white text-xs font-bold px-2 py-1 rounded-br-xl z-10">
                    جدید
                </div>
            )}
            {product.importent != 0 && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-bl-xl z-10">
                    ویژه
                </div>
            )}

            {/* تصویر */}
            <div className="h-96 bg-grayLight flex items-center justify-center p-2">
                <img
                    src={product.picturesURL || "https://via.placeholder.com/150"}
                    alt={product.Title}
                    className="object-contain h-full max-h-40"
                />
            </div>

            {/* محتوا */}
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-semibold mb-1 break-words line-clamp-1">{product.Title}</h3>

                    {product.Brand && (
                        <p className="text-md text-gray mb-1">
                            برند: <span className="font-medium text-grayDark">{product.Brand}</span>
                        </p>
                    )}
                    <p className="text-sm text-gray mb-2 line-clamp-2">{product.Description}</p>

                    <div className="flex justify-between text-xs text-grayDark my-1 mb-3">
                        <span className="bg-grayLight px-2 py-0.5 rounded-full">
                            دسته: {product.Category || "نامشخص"}
                        </span>
                        <span className="bg-grayLight px-2 py-0.5 rounded-full">
                            موجودی: {product.Stock ?? 0}
                        </span>
                    </div>

                    {product.discount > 0 && (
                        <div className="text-lg text-red font-bold mb-2">
                            🔻 تخفیف: {product.discount}٪
                        </div>
                    )}
                </div>

                {/* قیمت و دکمه */}
                <div className="mt-4 space-y-2">
                    <div className="text-md text-white flex justify-center bg-teal py-1 font-bold rounded-3xl">
                        {product.Price?.toLocaleString()} تومان
                    </div>

                    <button
                        className="w-full bg-orange hover:bg-orangeDark text-white text-sm py-2 rounded-xl transition"
                        onClick={() => dispatch(addToCartWithCheck(product))}
                    >
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    );
}
