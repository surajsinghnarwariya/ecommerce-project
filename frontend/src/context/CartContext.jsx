import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));

  // ✅ USER UPDATE
  useEffect(() => {
    const updateUser = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("authChanged", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
    };
  }, []);

  // ✅ LOAD CART
  useEffect(() => {
    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    setCart(allCarts[user] || []);
  }, [user]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    if (!user) {
      alert("Please login first ❌");
      return;
    }

    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};

    if (!allCarts[user]) {
      allCarts[user] = [];
    }

    const productId = product._id || product.id;

    const existingIndex = allCarts[user].findIndex(
      (item) => (item._id || item.id) === productId
    );

    if (existingIndex !== -1) {
      allCarts[user][existingIndex].qty += 1;
    } else {
      allCarts[user].push({ ...product, qty: 1, id: productId });
    }

    localStorage.setItem("carts", JSON.stringify(allCarts));
    setCart([...allCarts[user]]);

    window.dispatchEvent(new Event("cartUpdated"));
  };
  // ✅ REMOVE ITEM
  const removeFromCart = (index) => {
    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    const userCart = allCarts[user] || [];

    userCart.splice(index, 1);

    allCarts[user] = userCart;
    localStorage.setItem("carts", JSON.stringify(allCarts));

    setCart([...userCart]);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ DECREASE QTY
  const decreaseQty = (index) => {
    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    const userCart = allCarts[user] || [];

    if (userCart[index].qty > 1) {
      userCart[index].qty -= 1;
    } else {
      userCart.splice(index, 1);
    }

    allCarts[user] = userCart;
    localStorage.setItem("carts", JSON.stringify(allCarts));

    setCart([...userCart]);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};