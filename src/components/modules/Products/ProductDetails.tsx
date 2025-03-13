import { IProduct } from "@/types/product";

const ProductDetails = ({ product }: { product: IProduct }) => {
  console.log(product);
  return (
    <div>
      <div>
        <img
          src={product?.image}
          alt={product.name}
          className="w-60 h-60 object-cover rounded-md"
        />
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>MRP. {product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
