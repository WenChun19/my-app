import CartQuantityButton from "./CartQuantityButton";

const CartItem = () => {
  return (
    <div className="card card-side bg-base-100 flex flex-col sm:flex-row w-full">
      <figure>
        <img
          className="w-3/4 mt-10 sm:mt-3 aspect-square object-contain"
          src="https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Fmaoupmal%2Fimages%2Fproduct%2Fproduct-3114291%2Fcached%2FZqr1wVq3663a0a5913770_1715079769_420x420.jpg&w=1920&q=100"
          alt="Movie"
        />
      </figure>
      <div className="card-body sm:w-96 p-8">
        <h2 className="card-title text-md">(Buy 3 Free 1) Golden DHA+ Growth Support - 30 sachets (Puppy Dog) (exp. 21 Jun 2024)</h2>
        <p>32.9</p>
        <div className="card-actions justify-end">
          <CartQuantityButton />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
