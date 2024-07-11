import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import PaymentId from "./pages/PaymentId";
import PaymentDescription from "./pages/PaymentDescription";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment/:id" element={<PaymentId />} />
            <Route
              path="payment/:id/description"
              element={<PaymentDescription />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
