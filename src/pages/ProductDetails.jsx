import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-bold">جزئیات محصول {id}</h1>
      <p>اینجا اطلاعات کامل محصول نمایش داده می‌شود.</p>
    </div>
  );
}

export default ProductDetails;
