import React from "react";
import loader from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-80vh">
      <img src={loader} alt="Loading spinner" className="animate-horizontal-spin h-24 w-24" />
    </div>
  );
};

export default Loader;
