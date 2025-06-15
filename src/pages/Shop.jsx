import ProductCard from '../components/ProductCard';

const mockProducts = [
    { id: 1, name: 'محصول ۱', price: '100,000', image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'محصول ۲', price: '150,000', image: 'https://via.placeholder.com/300' },
];

function Shop() {
    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">محصولات</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}

export default Shop;
