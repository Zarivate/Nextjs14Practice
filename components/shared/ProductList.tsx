import React from "react";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";
import { Product } from "@/types";

function ProductCard({ product }: { product?: Product }) {
  return (
    <div className="max-h-full shadow-lg max-w-sm">
      {product ? (
        <Image
          src={product.image}
          width={158}
          height={200}
          alt={product.title}
          style={{ objectFit: "contain", height: "200px", width: "158px" }}
        />
      ) : (
        <Skeleton className="skeleton-post" />
      )}
      <div className="w-56">
        {product ? (
          <h1 className="bg-black">{product.title}</h1>
        ) : (
          <Skeleton className="skeleton-post" />
        )}
        {product ? (
          <text>{product.price}</text>
        ) : (
          <Skeleton className="skeleton-post" />
        )}
      </div>
    </div>
  );
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="post-holder">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="w-full p-2 overflow-auto gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
