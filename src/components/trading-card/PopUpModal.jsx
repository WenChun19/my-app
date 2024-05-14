import React from "react";

const PopUpComponent = ({ title, image }, ref) => {
  const textDirection = image?.includes("-left") ? "left" : "right";
  const textColor = image?.includes("-white") ? "white" : "slate-700";
  return (
    <dialog id="my_modal_1" className="modal" ref={ref}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">
          Congratulationss! You have drawn little
        </h3>
        <div className="relative">
          <div
            className={`absolute ${
              textDirection == "right"
                ? " top-1/2 left-1/2 sm:left-3/4"
                : "  top-1/3 left-10 sm:left-20"
            } text-${textColor} text-lg font-bold`}
          >
            {title}
          </div>
          <img src={`puppies/${image}`} alt={title} className="object-cover" />
        </div>
        <div className="modal-action mt-2">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const PopUpModal = React.forwardRef(PopUpComponent);

export default PopUpModal;
