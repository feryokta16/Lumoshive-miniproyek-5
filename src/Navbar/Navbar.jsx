import React, { useContext } from "react";
import { LanguageContext } from "../App";
import "./Navbar.css";

const Navbar = () => {
  const { Language, setLanguage } = useContext(LanguageContext);
  return (
    <div className="navbar">
      <div>
        <h1>Fery Crud</h1>
      </div>
      <div className="btn-group">
        <button
          onClick={() => setLanguage(Language === "en" ? "id" : "en")}
          className="btn btn-primary mx-2"
        >
          {Language === "en" ? "Indonesia" : "English"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
