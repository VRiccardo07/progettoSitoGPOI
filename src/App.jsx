import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Impatto from "./pages/impatto";
import Soluzione from "./pages/soluzione";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/impatto"   element={<Impatto />} />
        <Route path="/soluzione" element={<Soluzione />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
