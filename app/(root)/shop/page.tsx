import ProductListHolder from "@/components/shared/ProductListHolder";
import { fetchProducts } from "@/lib/actions/products.actions";
import { Product } from "@/types";
import { headers } from "next/headers";
import React from "react";

const ShopPage = async () => {
  let products: Product[] | undefined;

  // if browser is requesting html it means it's the first page load
  if (headers().get("accept")?.includes("text/html")) {
    products = await fetchProducts();
  }

  return <ProductListHolder products={products} />;
};

export default ShopPage;
