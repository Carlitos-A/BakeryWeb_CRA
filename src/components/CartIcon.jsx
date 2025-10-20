
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="btn btn-outline-dark position-relative">
      <i className="bi bi-cart"></i>
      {cart.length > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.length}
        </span>
      )}
    </Link>
  );
}
