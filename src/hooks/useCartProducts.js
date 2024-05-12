import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCartProducts, updateCartProducts } from "../api/carts";
import { useAuth } from "../provider/AuthProvider";
import useLocalStorage from "./useLocalStorage";

const useCartProducts = () => {
  const { isLogin } = useAuth();
  const [currentCartProduct, setCurrentCartProduct] = useState({});
  const [cartProductsToBeCleared, setCartProductsToBeCleared] = useState([]);

  const [storageCartProducts, setStorageCartProducts] =
    useLocalStorage("cartProducts");

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: getCartProducts,
    enabled: isLogin,
  });

  const editMutation = useMutation({
    mutationFn: updateCartProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("cartProducts");
      setCartProductsToBeCleared([]);
    },
  });
  let cartProducts = isLogin ? data?.products ?? [] : storageCartProducts;

  // edit cart products
  useEffect(() => {
    if (Object.keys(currentCartProduct)?.length > 0) {
      const existedCartProductIndex = cartProducts?.findIndex(
        ({ productId }) => +productId === +currentCartProduct?.productId
      );

      let latestCartProducts = [];
      if (existedCartProductIndex !== -1) {
        latestCartProducts = cartProducts?.toSpliced(
          existedCartProductIndex,
          1,
          currentCartProduct
        );
      } else {
        latestCartProducts = [...cartProducts, currentCartProduct];
      }
      const latestCart = {
        ...data,
        products: latestCartProducts,
      };

      if (isLogin) {
        editMutation.mutate(latestCart);
      } else {
        setStorageCartProducts(latestCartProducts);
      }
    }
  }, [currentCartProduct]);

  // remove cart products
  useEffect(() => {
    if (cartProductsToBeCleared?.length > 0) {
      let latestCartProducts = [];
      const clearedProductIds = cartProductsToBeCleared?.map(
        (product) => product?.productId
      );
      latestCartProducts = cartProducts?.filter(
        (cartProduct) => !clearedProductIds?.includes(cartProduct?.productId)
      );

      const latestCart = {
        ...data,
        products: latestCartProducts,
      };

      if (isLogin) {
        editMutation.mutate(latestCart);
      } else {
        setStorageCartProducts(latestCartProducts);
      }
    }
  }, [cartProductsToBeCleared?.length]);

  return [cartProducts, setCurrentCartProduct, setCartProductsToBeCleared];
};

export default useCartProducts;
