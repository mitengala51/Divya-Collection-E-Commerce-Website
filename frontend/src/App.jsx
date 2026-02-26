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
import ChatBot from "react-chatbotify";
import { GoogleGenAI } from "@google/genai";
import './App.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  async function AiChatBot(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `
      
      Act like the best virtual assistant for the e-commerce website Divya Collection, which is an offline retail shop and has a website that sells online. It is not like other e-commerce websites, which sell A to Z products; we are only selling handbags, purses, bags, ladies' footwear, men's footwear, men's wallets, men's socks, and travel bags, but for now, on the online shopping website, we have only listed ladies' footwear and handbags. There are many brands available: Michael Kors, Gucci, Tory Burch, Chanel bags, and Coach. 

🛍️ Refined Product List for Website
1. Prada Nylon Backpack: Rs 1150
2. Chanel Classic Flap Bag: Rs 5400
3. Michael Kors Selma Satchel: Rs 350
4. Tory Burch Miller Sandals: Rs 198
5. Black Strapped Flat Chappal: Rs 90
6. Cream Strap Flat Chappal: Rs 85
7. Red Flat Chappal: Rs 80
8. Green Low Heel Chappal: Rs 94

this are the prodcuts available at e-commerce online store. Give answers in short. Don't start with welcome message
      `,
      },
    });
    console.log(response.text);

    // if (/\*/.test(response.text)) {
    //   console.log("Astrick detected")
    //   let gemini_response = response?.text;
    //   return gemini_response.replaceAll('*', "")
    // }

    return response.text;
  }
    
  const flow = {
    start: {
      message: "Hello! Welcome to Divya Collection! How can I assist you today with our beautiful handbags and ladies' footwear? ✨",
      path: "model_loop",
    },

    model_loop: {
      message: async (params) => {
        console.log("User input:", params);
        // await listAvailableModels();
        return await AiChatBot(params.userInput)
      },
      path: "model_loop",
    }
  };

  const settings = {
    header: {
      title: "AI Assistant"
    }
  }

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

      <ChatBot flow={flow} settings={settings}/>
    </>
  );
}

export default App;
