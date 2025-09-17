import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProduct,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";

const HomePage = async () => {
  const LatestProduct = await getLatestProduct();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
        )}
      <ProductList data={LatestProduct} title="New Item" limit={4} />
    </>
  );
};

export default HomePage;
