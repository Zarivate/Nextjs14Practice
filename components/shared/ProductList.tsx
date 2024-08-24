import React from "react";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";
import { Product } from "@/types";

function ProductCard({ product }: { product?: Product }) {
  return (
    <div className="shadow-lg w-full place-items-center">
      {product ? (
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            width={158}
            height={200}
            alt={product.title}
            style={{ objectFit: "fill", height: "200px", width: "158px" }}
          />
        </div>
      ) : (
        <Skeleton className="skeleton-post" />
      )}
      <div className="">
        {product ? (
          <div className="text-center">
            <h1 className="mb-2">{product.title}</h1>
            <h1 className="">{product.description}</h1>
            <text className="">{product.price} Credits</text>
          </div>
        ) : (
          <Skeleton className="skeleton-post" />
        )}
        {product ? (
          <div className="text-center mt-2">
            <a href={product.srcLink}>{product.srcText}</a>
          </div>
        ) : (
          <Skeleton className="skeleton-post" />
        )}
      </div>
    </div>
  );
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 place-content-evenly h-full">
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
