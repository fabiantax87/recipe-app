import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "pages/Layout/Layout";
import Dinner from "pages/Dinner/Dinner";
import Lunch from "pages/Lunch/Lunch";
import Breakfast from "pages/Breakfast/Breakfast";
import Register from "pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="dinner" element={<Dinner />} />
          <Route path="lunch" element={<Lunch />} />
          <Route path="breakfast" element={<Breakfast />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
