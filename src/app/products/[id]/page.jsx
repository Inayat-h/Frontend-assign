"use client";

import React, { use } from "react";
import useSWR from "swr";
import ProductDetailsWrapper from "./ProductDetailsWrapper";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductPage({ params }) {
  const { id } =use(params);

  
  const { data: product, error, isLoading } = useSWR(`/api/products/${id}`, fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="p-8">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="p-8 text-red-500">Failed to load product</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <ProductDetailsWrapper product={product} />
    </div>
  );
}

