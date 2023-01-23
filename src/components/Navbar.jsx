import { Box } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import '../styles/Navbar.css'

const Navbar = () => {
  let location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar className='d-flex justify-content-around'>
        <Link className={location.pathname === '/sales' ? 'LinkSelected' : 'Link' } to='/mi familia/sales'>Ventas</Link>
        <Link className={location.pathname === '/' ? 'LinkSelected' : 'Link' } to='/mi familia'>Empleado</Link>
        <Link className={location.pathname === '/admin' ? 'LinkSelected' : 'Link' } to='/mi familia/transactions'>Transacciones</Link>
        <Link className={location.pathname === '/products' ? 'LinkSelected' : 'Link' } to='/mi familia/products'>Productos</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar