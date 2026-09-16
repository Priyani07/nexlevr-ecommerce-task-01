import {Routes,Route,Link} from "react-router-dom";
import {useAuth} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
function Guard(
    {
        children,admin=false
    })
    {
        const{user}=useAuth();
        if(!user)
            return <main className="page"><h2>Sign in required</h2><Link className="cta" to="/login">Sign in</Link></main>;
        if(admin&&user.role!=="admin")
            return <main className="page"><h2>Admin access required</h2></main>;
        return children
    }
export default function App(){
    return <><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:id" element={<ProductDetails/>}/><Route path="/cart" element={<Cart/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/checkout" element={<Guard><Checkout/></Guard>}/><Route path="/orders" element={<Guard><Orders/></Guard>}/><Route path="/profile" element={<Guard><Profile/></Guard>}/><Route path="/admin" element={<Guard admin><AdminDashboard/></Guard>}/></Routes><Footer/></>
}