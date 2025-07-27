import React from "react";
import "./App.css";
import Navbars from "./Components/Navbars";
import Customers from "./Components/Customers/Customers";
import NotFound from "./pages/NotFound";
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
            {/* <Home /> */}
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
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
