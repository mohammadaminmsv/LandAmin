import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="p-4 mx-4 md:mx-20">
      <h2 className="text-xl font-bold mb-4">نتایج جستجو</h2>

      {results.length === 0 ? (
        <p className="text-gray-500">موردی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((p) => (
            <ProductCard key={p.NidProduct} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
