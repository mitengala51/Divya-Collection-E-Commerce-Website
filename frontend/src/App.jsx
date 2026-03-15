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
import './App.css'
import axios from "axios";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  async function AiChatBot(prompt) {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chatbot`,{
      UserMessage: prompt
    })

    console.log("AI Response: ", response?.data?.AiMessage)

    if (/\*/.test(response?.data?.AiMessage)) {
      console.log("Astrick detected")
      let gemini_response = response?.data?.AiMessage;
      return gemini_response.replaceAll('*', "")
    }

    return response?.data?.AiMessage;
  }

  function getExtension(filename) {
  return filename.split('.').pop()
  }
    
  const flow = {
    start: {
      message: "Hello! Welcome to Divya Collection! How can I assist you today with our beautiful handbags and ladies' footwear? ✨",
      path: "model_loop",
      // file: (params) => handleUpload(params)
    },

    model_loop: {
      message: async (params) => {
        console.log("User input: ", params);
        const fileType = getExtension(params?.userInput)
        console.log("File Type: ", fileType)
        if(fileType === "jpg" || fileType === "png" || fileType === "jpeg") return handleUpload(params?.userInput)
        return await AiChatBot(params.userInput)
      },
      // chatDisabled: true,
      // file: (params) => handleUpload(params),
      path: "model_loop",
    }
  };

  const settings = {
    header: {
      title: "AI Assistant"
    },
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
