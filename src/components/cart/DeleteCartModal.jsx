import { useEffect, useRef } from "react";

const DeleteCartModal = ({
  cartProductsToBeRemoved,
  setCartProductsToBeRemoved,
  clearCartProducts,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (cartProductsToBeRemoved?.length > 0 && ref?.current) {
      ref.current.showModal();
    }
  }, [cartProductsToBeRemoved?.length]);

  return (
    <>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <div className="py-4">
            Are you sure want to remove the product(s) from the cart ?
          </div>
          <ul className="list-disc max-w-96 pl-4">
            {cartProductsToBeRemoved?.map(({ productId, title }) => {
              return (
                <li key={productId} className="text-sm font-semibold">
                  {title}
                </li>
              );
            })}
          </ul>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <div className="btn btn-primary" onClick={clearCartProducts}>
                Confirm
              </div>
              <button
                className="btn"
                onClick={() => setCartProductsToBeRemoved([])}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteCartModal;
