import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCartProducts, updateCartProducts } from "../api/carts";
import { useAuth } from "../provider/AuthProvider";

const useCartProducts = () => {
  const { isLogin } = useAuth();
  const [currentCartProduct, setCurrentCartProduct] = useState({});

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: getCartProducts,
    enabled: isLogin,
  });

  const editMutation = useMutation({
    mutationFn: updateCartProducts,
    onSuccess: () => queryClient.invalidateQueries("cartProducts"),
  });
  let cartProducts = isLogin ? data?.products ?? [] : [];

  useEffect(() => {
    if (Object.keys(currentCartProduct)?.length > 0 && isLogin) {
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
      editMutation.mutate(latestCart);
    }
  }, [currentCartProduct]);

  return [cartProducts, setCurrentCartProduct];
};

export default useCartProducts;
