const ProductCard = ({ title, price, image }) => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl col-span-1">
      <figure>
        <img
          src={image}
          className={"w-3/4 aspect-square object-contain mt-4"}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-base">{title}</h3>
        <p>{price}</p>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
