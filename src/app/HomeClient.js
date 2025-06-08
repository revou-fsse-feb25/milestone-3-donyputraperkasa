// app/home/HomeClient.js (Client Component)
"use client";
import { useState } from "react";

export default function HomeClient({ products }) {
  const [product, setProduct] = useState(products);
  const [originalProduct, setOriginalProduct] = useState(products);

  function searchHandler(e) {
    const value = e.target.value;
    const filteredProduct = originalProduct.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setProduct(filteredProduct);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search product"
        onChange={searchHandler}
        className="border p-2 rounded mb-4"
      />
      <ul>
        {product.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </>
  );
}