import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductOverView from "./pages/ProductOverView";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import UserOrdersForAdmin from "./pages/UserOrdersForAdmin";
import UserOrders from "./pages/UserOrders";
import Search from "./pages/Search";
import SuccessOrder from "./pages/OrderSuccess";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Routes>
        <Route Component={ProductOverView} path="/overview" />
      </Routes>

     

      <Routes>
        <Route Component={WishList} path="/wishlist" />
      </Routes>

      <Routes>
        <Route Component={Login} path="/login" />
      </Routes>
      <Routes>
        <Route Component={Signup} path="/signup" />
      </Routes>

      <Routes>
        <Route Component={AdminLogin} path="/admin_login" />
      </Routes>

      <Routes>
        <Route Component={Admin} path="/admin" />
      </Routes>

      <Routes>
        <Route Component={UserOrdersForAdmin} path="/user_orders_for_admin" />
      </Routes>

      <Routes>
        <Route Component={UserOrders} path="/user_orders" />
      </Routes>

      <Routes>
        <Route Component={Search} path="/search" />
      </Routes>
      <Routes>
        <Route Component={SuccessOrder} path="/success_order" />
      </Routes>
    </div>
  );
}

export default App;
