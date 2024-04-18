import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  // const products = useSelector((state) => state.cart.items);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav>
      <h2>
        <Link to={"/"}>Logo</Link>
      </h2>
      <div>
        <Link to={"/"}>Home</Link>
        <Link className="cartIcon" to={"/cart"}>
          <FiShoppingBag className="" />
          <p>{cartItems.length}</p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
