
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductGrid from "../components/ProductGrid";

export default function ReactQuery() {
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:4000/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products... ⏳</p>;
  if (isError) return <p>Error: {error.message} ❌</p>;

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="mb-3">React Query Page</h1>
         <div className="shop-products">
                <ProductGrid products={data} />
        </div>


      {data && (
        <ul>
          {data.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
