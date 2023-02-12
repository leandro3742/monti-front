import "bootstrap/dist/css/bootstrap.css";
import './styles/App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Reports from "./pages/Reports";
import Employee from "./pages/Employee";
import Products from "./pages/Products";
import Spinner from "./components/Spinner";
import { SnackbarProvider } from 'notistack';
import Sales from "./pages/Sales";
// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [show, setShow] = useState(false)

  const openSpinner = () => setShow(true)
  const closeSpinner = () => setShow(false)
  const THEME = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#a8dadc',
      },
      secondary: {
        main: '#457b9d',
      },
    },
    typography: {
      fontFamily: 'Libre Baskerville, serif',
    }
  })
  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
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
              <Route path="/" element={<Home />} />
              <Route path="/:business" exact element={<Employee openSpinner={openSpinner} closeSpinner={closeSpinner} />} />
              <Route path="/:business/sales" exact element={<Sales openSpinner={openSpinner} closeSpinner={closeSpinner} />} />
              <Route path="/:business/transactions" exact element={<Reports openSpinner={openSpinner} closeSpinner={closeSpinner} />} />
              <Route path="/:business/products" exact element={<Products openSpinner={openSpinner} closeSpinner={closeSpinner} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
