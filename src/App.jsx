import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Products from "./pages/Products";
import Spinner from "./components/Spinner";

function App() {
  const [show, setShow] = useState(false)

  const openSpinner = () => setShow(true)
  const closeSpinner = () => setShow(false)

  return (
    <div>
    <BrowserRouter>
      <Spinner show={show} />      
      <Navbar />
      <div>
        <Routes>
          <Route path="/" exact element={<Employee openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
          <Route path="/admin" exact element={<Admin openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
          <Route path="/products" exact element={<Products openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App
