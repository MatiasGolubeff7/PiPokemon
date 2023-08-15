import "./App.css";
import LandingPage from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import { Routes, Route } from "react-router-dom";
import Aboutme from "./views/Aboutme/Abautme";
import CreatePoke from "./views/CreatePoke/CreatePoke";
import DetailsPage from "./views/Detail/Detail";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Aboutme />} />
        <Route path="/createPoke" element={<CreatePoke />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
