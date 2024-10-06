import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      </Routes>
  </>
  );
}

export default App;
