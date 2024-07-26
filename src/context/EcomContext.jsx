import { createContext, useState, useEffect, useContext } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "../context/AuthContext";

const EcomContext = createContext();

export const EcomProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { alertInfo, showAndHide } = useAlert();
  const [state, dispatch] = useContext(AuthContext);

  const isAuthenticated = state.accessToken !== null;

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  useEffect(() => {
    const count = cartItems.products?.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const countItem = count ? count : 0;

    setCartCount(countItem);
  }, [cartItems]);

  const fetchProduct = async () => {
    const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/product");
    const data = await res.json();
    setProduct(data);
  };

  const featured = product.filter((item) => item.featured === true);
  const topSelling = product.filter((item) => item.topSelling === true);

  const addToCart = async (productId) => {
    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();
      setCartItems(data);
      showAndHide("success", "item added to cart");
    } catch (error) {
      console.error(error);
    }

    // const existingItemIndex = cartItems.findIndex(
    //   (item) => item.id === prod.id
    // );

    // if (existingItemIndex !== -1) {
    //   const updateCart = [...cartItems];
    //   const itemToUpdate = updateCart[existingItemIndex];
    //   itemToUpdate.quantity += prod.quantity;
    //   itemToUpdate.amount = itemToUpdate.price * itemToUpdate.quantity;
    //   showAndHide("error", "Item already exist");
    // } else {
    //   setCartItems([
    //     ...cartItems,
    //     { ...prod, amount: prod.price * prod.quantity },
    //   ]);
    //   showAndHide("success", "item added to cart");
    // }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });

      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!quantity > 0) {
      showAndHide("error", "quantity cannot be less than 1");
      return;
    }

    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (res.ok) {
        const existingItemIndex = cartItems.products?.findIndex(
          (item) => item.product._id === productId
        );
        const updateCart = [...cartItems.products];
        const itemToUpdate = updateCart[existingItemIndex];
        itemToUpdate.quantity = quantity;
        itemToUpdate.amount =
          itemToUpdate.product.price * itemToUpdate.quantity;
        setCartItems({ ...cartItems, products: updateCart });
        setCartItems(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount = () => {
    return cartItems.products?.reduce((acc, cur) => acc + cur.amount, 0);
  };

  const deleteItem = async (productId) => {
    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/remove-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        showAndHide("success", "one item removed from cart");
        setCartItems(data);
      } else {
        console.error(data.msg || "Failed to remove Item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (transaction_id, orderId) => {
    try {
      const response = await fetch("https://startech-ecom-api-scax.onrender.com/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ transaction_id, orderId }),
        credentials: "include",
      });

      const data = await response.json();
      if (res.ok) {
        setOrder(data.order);
        setCartItems([]);
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EcomContext.Provider
      value={{
        product,
        featured,
        topSelling,
        addToCart,
        showAndHide,
        alertInfo,
        cartItems,
        updateQuantity,
        totalAmount,
        deleteItem,
        isAuthenticated,
        cartCount,
        createOrder,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export default EcomContext;
