import { fetchProducts } from "@/lib/actions/products.actions";
import { Product } from "@/types";
import React from "react";
import { ProductList } from "./ProductList";
import { SuspenseCheck } from "./SuspenseCheck";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";

async function ProductListLoader() {
  const products = await fetchProducts();

  return <ProductList products={products} />;
}

const ProductListHolder = ({ products }: { products?: Product[] }) => {
  return (
    // TODO: Change the loading state for this
    <SuspenseCheck condition={!products} fallback={<LoadingPostsSkeleton />}>
      <ProductListLoader />
    </SuspenseCheck>
  );
};

export default ProductListHolder;
