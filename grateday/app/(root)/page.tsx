import ProductList from "@/components/shared/product/product-list";
import { getLatestProduct } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const LatestProduct = await getLatestProduct();
  return (
    <>
      <ProductList
        data={LatestProduct}
        title="New Item"
        limit={4}
      />
    </>
  );
};

export default HomePage;
