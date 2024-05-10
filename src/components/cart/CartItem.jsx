const CartItem = () => {
  return (
    <div className="card card-side bg-base-100 py-4 flex flex-col lg:flex-row">
      <figure>
        <img
          className="w-3/4 aspect-square object-contain"
          src="https://erp-image.sgliteasset.com/_next/image?url=https%3A%2F%2Fcdn1.sgliteasset.com%2Fmaoupmal%2Fimages%2Fproduct%2Fproduct-3114291%2Fcached%2FZqr1wVq3663a0a5913770_1715079769_420x420.jpg&w=1920&q=100"
          alt="Movie"
        />
      </figure>
      <div className="card-body w-[400px]">
        <h2 className="card-title text-md">(Buy 3 Free 1) Golden DHA+ Growth Support - 30 sachets (Puppy Dog) (exp. 21 Jun 2024)</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
