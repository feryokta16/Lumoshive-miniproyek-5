import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ListData from "./ListData/ListData";
import DetailData from "./Detail/DetailData";

export const LanguageContext = createContext();

const App = () => {
  const [Language, setLanguage] = useState("en");
  const changeLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "id" : "en"));
  };
  return (
    <LanguageContext.Provider value={{ Language, setLanguage: changeLanguage }}>
      <div className="container">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListData />} />
            <Route path="/detail/:id" element={<DetailData />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
