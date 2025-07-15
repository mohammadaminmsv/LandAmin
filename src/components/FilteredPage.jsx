import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProduct } from "../services/Product/getAllProduct";
import ProductCard from "./ProductCard";
import { getBrands } from "../services/Brands/getBrands";
import { getCategory } from "../services/Category/getCategory";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
export default function FilteredPage({ type }) {
  const { filterName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandInfo, setBrandInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const res = await getAllProduct();
        if (res.success) {
          if (type === "category") {
            const filteredCategory = res.data.filter((item) =>
              type === "category"
                ? item.Category === filterName
                : item.Brand === filterName
            );
            setFilteredProducts(filteredCategory);
          }
          if (type === 'brand') {
            const filteredBrand = res.data.filter((item) =>
              type === "brand"
                ? item.Brand === filterName
                : item.Brand === filterName
            );
            setFilteredProducts(filteredBrand);
          }


        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAndFilter();
  }, [filterName, type]);

  // 👉 گرفتن اطلاعات برند
  useEffect(() => {
    const fetchBrandInfo = async () => {
      if (type === "brand") {
        try {
          const res = await getBrands();
          if (res.success) {
            const brand = res.data.find((b) => b.Name === filterName);
            setBrandInfo(brand);
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (type === "category") {
        try {
          const res = await getCategory();
          if (res.success) {
            const brand = res.data.find((b) => b.Name === filterName);
            setBrandInfo(brand);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBrandInfo();
  }, [filterName, type]);

  const sourceData = filteredProducts.length > 0 ? filteredProducts : brandInfo?.Products || [];
  const totalPages = Math.ceil(sourceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sourceData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 mx-4 md:mx-20">
      <div className="flex justify-center mb-6">
        <div className="bg-teal border border-darkBlue text-center px-6 py-4 rounded-2xl shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-extrabold text-darkBlue mb-2">
            {type === "category" ? "دسته‌بندی" : "برند"}: {filterName}
          </h2>

          {brandInfo && (
            <p className="text-sm text-grayDark leading-relaxed">
              {brandInfo.Description || "توضیحاتی برای این برند موجود نیست."}
            </p>
          )}
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
  );
}
