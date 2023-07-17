import React from "react";

const Modal = () => {
  return (
    <div className="bg-black absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center z-10">
      <div className="w-[400px] h-[210px] rounded-md bg-white font-abc mt-[200px] py-4 px-2 space-y-6 ">
        <img src="/caratriste.png" alt="" className="w-[40px] mx-auto" />
        <p className="text-center uppercase text-red-600 font-bold">
          Are you sure you want to delete the product?
        </p>
        <div className="w-full flex justify-center">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md ">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
