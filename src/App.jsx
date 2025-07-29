import React from "react";
import "./App.css";
import Navbars from "./Components/Navbars";
import Customers from "./Components/Customers/Customers";
import NewCustomer from "./Components/Customers/NewCustomer";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbars />
            <Home />
          </>
        }
      />
      <Route
        path="/customers"
        element={
          <>
            <Navbars />
            <Customers />
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/customers/newCustomer"
        element={
          <>
            <Navbars />
            <NewCustomer />
          </>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
