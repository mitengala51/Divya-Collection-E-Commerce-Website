import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Demo from "./Pages/Demo";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import CompleteProfilePage from "./Pages/CompleteProfilePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import { useState } from "react";
import { LoggedIn } from "./Components/context/loggedIn";
import ShoppingPage from "./Pages/ShoppingPage";
import './App.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
    <LoggedIn.Provider value={{loggedIn, setLoggedIn}}>
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
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/about-Us" element={<AboutUsPage />} />
        <Route path="/contact-Us" element={<ContactUsPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      </LoggedIn.Provider>
    </>
  );
}

export default App;
