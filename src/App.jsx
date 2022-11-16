import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/employee" exact element={<Employee />} />
          <Route path="/admin" exact element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
