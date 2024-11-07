import React from 'react';


//Display items in cart
function ItemInCart({ item }) {
   return (
      <div className="cart-item">
         <span>{item.name} x {item.quantity}.....</span>                     
         <span>{item.price * item.quantity} kr</span>
      </div>
   );
}

export default ItemInCart;
