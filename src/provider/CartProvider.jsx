import { createContext, useContext } from "react";
import useCartProducts from "../hooks/useCartProducts";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartProducts, setCurrentCartProduct] = useCartProducts();

  const addItemQuantity = () => {};

  const subtractItemQuantity = () => {};

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
      (acc, { quantity }) => acc + quantity,
      0
    );

    return totalQuantity;
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addItemQuantity,
        subtractItemQuantity,
        addCartProduct,
        clearCartProducts,
        getTotalCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
