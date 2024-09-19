import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductOverView from "./pages/ProductOverView";
import Cart from "./pages/Cart";

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
      </Router>
    </div>
  );
}

export default App;
