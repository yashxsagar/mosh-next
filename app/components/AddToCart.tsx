//On the Top we use the client directive
"use client";
import React from "react";

const AddToCart = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {" "}
      <button
        className="cursor-default"
        onClick={() => console.log("Clicked!")}
      >
        Add to Cart
      </button>{" "}
      <button className="btn btn-primary hover:bg-red-300 text-white">
        Daisy UI Button
      </button>
    </div>
  );
};

export default AddToCart;
