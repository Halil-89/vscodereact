
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import CartPage from "./pages/cart";
import BillPage from "./pages/bill";
import UserPage from "./pages/user";
import CustomerPage from "./pages/customer";
import StatisticPage from "./pages/statistic"
import RegisterPage from "./pages/auth/register"
import LoginPage from "./pages/auth/login"
import ProducPage from "./pages/product"
import { useSelector } from "react-redux";
import { useEffect } from "react";




function App() {
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("posUser"))

  console.log(cart, "CART");
  console.log(user, "USER");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
   
  }, [cart])




  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />
        <Route
          path="/users"
          element={
            <RouteControl>
              <UserPage />
            </RouteControl>
          }
        />
        <Route
          path="/Customers"
          element={
            <RouteControl>
              <CustomerPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route
          path="/product"
          element={
            <RouteControl>
              <ProducPage />
            </RouteControl>
          } />
        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

