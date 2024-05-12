import { createContext, useContext } from "react";
import useCartProducts from "../hooks/useCartProducts";
import { getProductAvailableStatus } from "../utils/main-helper";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartProducts, setCurrentCartProduct] = useCartProducts();

  const addItemQuantity = (productId) => {
    let currentCartProduct = {};
    const existedCartProductIndex = cartProducts?.findIndex(
      (product) => +product?.productId === +productId
    );
    if (existedCartProductIndex !== -1) {
      currentCartProduct = {
        ...cartProducts[existedCartProductIndex],
      };
      currentCartProduct.quantity++;
      delete currentCartProduct.id;
      setCurrentCartProduct(currentCartProduct);
    }
  };

  const subtractItemQuantity = (productId) => {
    let currentCartProduct = {};
    const existedCartProductIndex = cartProducts?.findIndex(
      (product) => +product?.productId === +productId
    );
    if (existedCartProductIndex !== -1) {
      currentCartProduct = {
        ...cartProducts[existedCartProductIndex],
      };
      currentCartProduct.quantity--;
      delete currentCartProduct.id;
      setCurrentCartProduct(currentCartProduct);
    }
  };

  const editItemQuantity = (productId) => (e) => {
    const itemQuantity = e?.target?.value;
    let currentCartProduct = {};
    const existedCartProductIndex = cartProducts?.findIndex(
      (product) => +product?.productId === +productId
    );
    if (existedCartProductIndex !== -1) {
      currentCartProduct = {
        ...cartProducts[existedCartProductIndex],
      };
      currentCartProduct.quantity = +itemQuantity;
      delete currentCartProduct.id;
      setCurrentCartProduct(currentCartProduct);
    }
  };

  const addCartProduct = (product) => {
    let currentCartProduct = {};
    const existedCartProductIndex = cartProducts?.findIndex(
      ({ productId }) => +productId === +product?.id
    );
    if (existedCartProductIndex !== -1) {
      currentCartProduct = {
        ...cartProducts[existedCartProductIndex],
      };
      currentCartProduct.quantity++;
    } else {
      currentCartProduct = {
        ...product,
        quantity: 1,
      };
      currentCartProduct.productId = currentCartProduct.id;
    }
    delete currentCartProduct.id;

    setCurrentCartProduct(currentCartProduct);
  };
  const clearCartProducts = () => {};

  const getTotalCartQuantity = () => {
    const totalQuantity = cartProducts?.reduce(
      (acc, { quantity }) => acc + +quantity,
      0
    );

    return totalQuantity;
  };

  const getAvailableCartProducts = () => {
    const availableProducts = cartProducts?.filter(({ date }) =>
      getProductAvailableStatus(date)
    );
    return availableProducts;
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addItemQuantity,
        subtractItemQuantity,
        editItemQuantity,
        addCartProduct,
        clearCartProducts,
        getTotalCartQuantity,
        getAvailableCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
