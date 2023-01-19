import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Products from "./pages/Products";
import Spinner from "./components/Spinner";
import { SnackbarProvider } from 'notistack';
import Sales from "./pages/Sales";

function App() {
  const [show, setShow] = useState(false)

  const openSpinner = () => setShow(true)
  const closeSpinner = () => setShow(false)

  return (
    <div>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <BrowserRouter>
          <Spinner show={show} />      
          <Navbar />
          <div>
            <Routes>
              <Route path="/:business" exact element={<Employee openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
              <Route path="/:business/sales" exact element={<Sales openSpinner={openSpinner} closeSpinner={closeSpinner} /> } />
              <Route path="/:business/transactions" exact element={<Admin openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
              <Route path="/:business/products" exact element={<Products openSpinner={openSpinner} closeSpinner={closeSpinner}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  )
}

export default App
