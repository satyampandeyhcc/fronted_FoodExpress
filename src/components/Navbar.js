import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const [cartView, setCartView] = useState(false);
  const loadCart = (e) => {
    setCartView(true);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic fw-bold "
            style={{
              fontFamily: "sans-serif",
            }}
            to="/"
          >
            FoodExpress
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {" "}
              {/* // me-auto login and signup in right side */}
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (// authtoken is exist then we see myorder otherwise we see login and signup
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? ( //authtoken is not  exist then  we see login and signup
              <div className="d-flex">
                <Link className="btn bg-white text-danger mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-danger mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={loadCart}
                >
                  {" "}
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {" "}
                    {data.length}{" "}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    {" "}
                    <Cart></Cart>{" "}
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  {" "}
                  Log Out{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
