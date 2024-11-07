import React, {useState} from "react"; 
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";  


function CartActions() {
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);




    //Add products to cart
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            const currentQuantity = existingProduct ? existingProduct.quantity : 0;
            if (currentQuantity < product.stock) {
                if (existingProduct) { 
                    return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevCart, {...product, quantity: 1}];
            } else {
                alert("Items exceeded stock amount");
                return prevCart;
            }
         
         
        });
    };


    const clearCart = () => setCart([]);


    //Handle checkout and stock
    const checkout = () => {

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return; 
        }

        const itemsToPurchase = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));


        fetch("http://localhost:5002/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemsToPurchase)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message); 
                clearCart(); 

            })
            .catch(error => {
                console.error("Error during checkout:", error);
                alert("Something went wrong with your purchase.");
            });
        };

    const totalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };


    return (
        <div>
          <div className="navbar">
            <h1>Cool Store</h1>
            <nav>
              <button onClick={() => setIsCartVisible(false)}>Products</button>
              <button onClick={() => setIsCartVisible(true)}>Cart ({totalQuantity()})</button>
            </nav>
          </div>
          
          <div className="main-content">
            {isCartVisible ? (
              <ShoppingCart cart={cart} onClearCart={clearCart} onCheckout={checkout} />
            ) : (
              <ProductList onAddToCart={addToCart} />
            )}
          </div>
        </div>
      );
  }

  export default CartActions;