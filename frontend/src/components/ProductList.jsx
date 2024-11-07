import React, { useState, useEffect } from 'react';
import ProductLayout from './ProductLayout';

function ProductList({ onAddToCart }) {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      async function fetchProducts() { // Skriv om async functions? 
         try {
            const response = await fetch('http://localhost:5002/products');
            const data = await response.json();
            setProducts(data);
         } catch (error) {
            console.error("Error fetching products:", error);
         }
      }

      fetchProducts();
   }, []);

   return (
      <div className="product-list">
         {products.map(product => (
            <ProductLayout key={product.id} product={product} onAddToCart={onAddToCart} />
         ))}
      </div>
   );
}

export default ProductList;
