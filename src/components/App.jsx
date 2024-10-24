import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../blocks/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="page">
          <div className="page__content">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
