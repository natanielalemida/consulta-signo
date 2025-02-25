import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { Formulario } from "./pages/formulario";

function Resultado() {
  const { signo } = useParams();
  return (
    <div className="container">
      <h2>Seu signo é: {signo}</h2>
      <a className="btn" href="/">Voltar</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/resultado/:signo" element={<Resultado />} />
      </Routes>
    </Router>
  );
}

export default App;
