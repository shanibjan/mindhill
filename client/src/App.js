import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductOverView from "./pages/ProductOverView";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import UserOrdersForAdmin from './pages/UserOrdersForAdmin';
import UserOrders from "./pages/UserOrders";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={Home} exact path="/" />
        </Routes>

        <Routes>
          <Route Component={ProductOverView} path="/overview" />
        </Routes>

        <Routes>
          <Route Component={Cart} path="/cart" />
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
      </Router>
    </div>
  );
}

export default App;
