import React, { useRef } from "react";
import ProductCard from "./ProductCard";

const ScrollProductBar = ({ products }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mb-12 text-center relative">
            {/* فلش‌ها */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
            >
                ◀
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
            >
                ▶
            </button>

            {/* اسکرول محصولات */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar px-10 pb-2 scroll-smooth"
            >
                {products.map((product) => (
                    <div
                        key={product.NidProduct}
                        className="bg-white rounded-2xl max-w-[340px] flex-shrink-0"

                    >
                        <ProductCard key={product.NidProduct} product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ScrollProductBar;
