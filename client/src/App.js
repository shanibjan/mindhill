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
          <Route  exact path="/"  element={<Home/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/:productId" element={<ProductOverView />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<AdminLogin />} path="/admin_login" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<UserOrdersForAdmin />} path="/user_orders_for_admin" />
          <Route element={<UserOrders />} path="/user_orders" />
          <Route element={<Search />} path="/search" />
          <Route element={<SuccessOrder />} path="/success_order" />

        </Routes>
    </div>
  );
}

export default App;
