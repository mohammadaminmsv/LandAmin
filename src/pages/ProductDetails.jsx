import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProduct } from "../services/Product/getAllProduct";
import { useCart } from "../hooks/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([
    { id: 1, text: "خیلی خوب بود!", rating: 4 },
    { id: 2, text: "معمولی", rating: 3 },
  ]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProduct();
        if (res.success) {
          const found = res.data.find((item) => String(item.NidProduct) === id);
          setProduct(found);

          if (found) {
            const relatedItems = res.data.filter(
              (item) =>
                item.NidProduct !== found.NidProduct &&
                item.Category === found.Category
            );
            setRelated(relatedItems.slice(0, 4));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments((prev) => [
        ...prev,
        { id: Date.now(), text: comment, rating },
      ]);
      setComment("");
      setRating(0);
    }
  };

  if (!product) {
    return <div className="p-6 text-center text-gray-500">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-6xl font-vazir">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md mb-10">
        <div className="flex items-center justify-center bg-grayLight rounded-lg p-4">
          <img
            src={
              product.picturesURL
                ? `https://landamin.com/uploads/${product.picturesURL}`
                : "https://via.placeholder.com/150"
            }
            alt={product.Title}
            className="object-contain h-full max-h-90 w-fit max-w-full"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-extrabold mb-2 text-gray-800">{product.Title}</h1>
            <p className="text-sm text-gray-600 mb-4">{product.Description}</p>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>برند:</strong> {product.Brand || "نامشخص"}</p>
              <p><strong>دسته‌بندی:</strong> {product.Category || "نامشخص"}</p>
              <p><strong>کد محصول:</strong> {product.serial || "ندارد"}</p>
              <p><strong>موجودی:</strong> {product.Stock ?? 0}</p>
            </div>

            {product.discount > 0 && (
              <div className="text-red text-lg font-bold mt-4">
                تخفیف {product.discount}%
              </div>
            )}

            <div className="text-greenDark text-xl font-bold mt-2">
              قیمت: {Number(product.Price).toLocaleString()} تومان
            </div>

            <div className="flex items-center mt-4 gap-2 text-sm">
              <label>تعداد:</label>
              <input
                type="number"
                min="1"
                max={product.Stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20 text-center"
              />
            </div>
          </div>

          <button
            className="mt-6 bg-orange hover:bg-orangeDark text-white py-2 rounded-lg transition"
            onClick={handleAddToCart}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-lg font-bold mb-4">نظرات کاربران</h3>

        <div className="space-y-3 text-sm text-gray-700 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="border-b pb-2">
              <div className="text-yellow-500 mb-1">
                {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
              </div>
              {c.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="نظر خود را بنویسید..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <div className="flex items-center gap-2 text-sm">
            <label>امتیاز:</label>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-xl ${rating >= num ? "text-yellow-500" : "text-gray-300"
                  }`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            onClick={handleAddComment}
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blueDark w-fit"
          >
            ارسال نظر
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">محصولات مشابه</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((item) => (
              <div key={item.NidProduct} className="text-sm text-center">
                <img
                  src={item.picturesURL || "https://via.placeholder.com/100"}
                  alt={item.Title}
                  className="w-full h-28 object-contain mb-2 border rounded"
                />
                <p className="font-bold line-clamp-1">{item.Title}</p>
                <p className="text-gray-500">{Number(item.Price).toLocaleString()} تومان</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}