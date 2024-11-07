
import React from 'react';

function ProductCard({ product, onAddToCart }) {
   return (
      <div className="product-card">
         <img src={product.image} alt={product.name} />
         <h3>{product.name}</h3>
         <p>Price: {product.price} :-</p>
         <p>Stock: {product.stock}</p>
         <button onClick={() => onAddToCart(product)} disabled={product.stock === 0}>

         {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
         
         </button>
      </div>
   );
}

export default ProductCard;
