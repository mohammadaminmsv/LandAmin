import React, { useEffect, useState } from "react";
import { getAllProduct } from "../services/Product/getAllProduct";
import ProductCard from "../components/ProductCard";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


export default function ProductsAll() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchProducts = async () => {
        try {
            const data = await getAllProduct();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-4 mx-4 md:mx-20">
            <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((p) => (
                    <div
                        key={p.NidProduct}
                        className="bg-white rounded-2xl max-w-[340px] flex-shrink-0"
                       
                    >
                        <ProductCard key={p.NidProduct} product={p} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-2 bg-teal text-white text-sm rounded disabled:opacity-50"
                >
                    <GrNext />

                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 text-sm rounded ${currentPage === i + 1 ? "bg-darkBlue text-white" : "bg-gray-100 text-gray-700"}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-2 bg-teal text-white text-sm rounded disabled:opacity-50"
                >
                    <GrPrevious />
                </button>
            </div>
        </div>
    );
}
