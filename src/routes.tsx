import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repo from "./pages/Repo";

export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:repo" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}
