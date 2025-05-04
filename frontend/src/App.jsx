import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Demo from "./Pages/Demo";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import { useState } from "react";

function App() {
  const [productId, setProductId] = useState('');

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/product-detail"
          element={<ProductDetailPage />}
        />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
