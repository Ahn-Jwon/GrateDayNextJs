import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProduct,
} from "@/lib/actions/product.actions";


const ProductListPage = async () => {
  const LatestProduct = await getLatestProduct();
  
  return (
    <>
      <ProductList data={LatestProduct} title="PRODUCT" limit={4} />
    </>
  );
};

export default ProductListPage;
