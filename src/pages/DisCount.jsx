import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../services/Product/getAllProduct';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import ProductCard from '../components/ProductCard';


const DisCount = () => {
  const [filterProduct, setFilterproduct] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const res = await getAllProduct();
        if (res.success) {
          const filteredCategory = res.data.filter((item) =>
            item.discount > 0
          );
          setFilterproduct(filteredCategory);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAndFilter();
  }, []);

  const totalPages = Math.ceil(filterProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filterProduct.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="p-4 mx-4 md:mx-20">
        <div className="flex justify-center mb-6">
          <div className="bg-teal border border-darkBlue text-center px-6 py-4 rounded-2xl shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-extrabold text-darkBlue mb-2">
              تخفیفات
            </h2>

          </div>
        </div>




        {currentItems.length === 0 ? (
          <p className="text-gray-500">محصولی برای نمایش وجود ندارد.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((p) => (
              <ProductCard key={p.NidProduct || p.NidBrand} product={p} />
            ))}
          </div>
        )}
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
    </div>
  )
}

export default DisCount
