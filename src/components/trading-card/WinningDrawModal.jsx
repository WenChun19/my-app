import React from "react";
import { Link } from "react-router-dom";

const PopUpComponent = ({ title }, ref) => {
  return (
    <dialog id="my_modal_1" className="modal " ref={ref}>
      <div className="modal-box bg-amber-100">
        <div className="">
          <img src={`/congrats.jpg`} alt={title} className="object-cover" />
        </div>
        <div className="flex justify-center mt-2">
          You have earned a lucky draw entry!!
          <Link to="/lucky-draw" className="ml-3 text-cyan-800 underline">Draw it now</Link>
        </div>
        <div className="modal-action mt-2 ">
          <form method="dialog">
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const WinningDrawModal = React.forwardRef(PopUpComponent);

export default WinningDrawModal;
