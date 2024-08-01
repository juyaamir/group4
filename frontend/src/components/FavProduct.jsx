import React from "react";

const FavProduct = ({ favArray }) => {
  return (
    <div className="border border-2 text-center m-6">
      <ul className="">
        {/* Sidebar content here */}
        {favArray.map((e) => (
          <li className="p-4">{e}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavProduct;
