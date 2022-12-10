import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Employee />} />
        <Route path="/admin" exact element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
