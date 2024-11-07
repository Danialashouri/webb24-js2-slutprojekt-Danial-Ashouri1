import React from 'react';


// Span or p tag? 
function ItemInCart({ item }) {
   return (
      <div className="cart-item">
         <span>{item.name} x {item.quantity}  </span>                       
         <span>{item.price * item.quantity} kr</span>
      </div>
   );
}

export default ItemInCart;
