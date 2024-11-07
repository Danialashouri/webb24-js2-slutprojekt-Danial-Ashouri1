import React from 'react';
import ItemInCart from './ItemInCart';

function ShoppingCart({ cart, onClearCart, onCheckout }) {
   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

   return (
      <div className="shopping-cart">
         <h2>Your Cart</h2>
         {cart.length > 0 ? (
            cart.map(item => <ItemInCart key={item.id} item={item} />)
         ) : (
            <p>Your cart is empty.</p>
         )}
         <h3>Total: {total} :-</h3>
         <button onClick={onClearCart}>Clear cart</button>
         <button onClick={onCheckout}>Checkout</button>
      </div>
   );
}

export default ShoppingCart;
