import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600">{product.price} تومان</p>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
