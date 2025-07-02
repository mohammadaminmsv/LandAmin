import React, { useRef } from "react";

const ScrollBar = ({ brands }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 200;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="mb-12 text-center relative">

            {/* فلش‌های چپ و راست */}
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

            {/* لیست برندها */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar px-10 pb-2"
            >
                {brands.map((brand, i) => (
                    <div
                        key={i}
                        className="min-w-[200px] flex flex-col justify-center bg-white px-6 py-3 rounded-full shadow text-sm font-medium flex-shrink-0 text-center"
                    >
                        <img
                            src={brand.image}
                            alt={brand.name}
                            height={100}
                            width={150}
                            className="mx-auto mb-2"
                        />
                        {brand.name}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ScrollBar;
