import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Nexlevr
      </Link>

      <div className="navlinks">
        <Link to="/">Home</Link>

        <Link to="/products">Shop</Link>

        {user && <Link to="/orders">Orders</Link>}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        <Link className="cart-link" to="/cart">
          Cart
          <span className="cart-count">{cart?.length || 0}</span>
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="profile-link">
              {user.name || "Account"}
            </Link>

            <button
              type="button"
              className="nav-logout"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link className="nav-register" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}