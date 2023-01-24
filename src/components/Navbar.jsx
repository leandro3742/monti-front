import { Box } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import '../styles/Navbar.css'

const Navbar = () => {
  let location = useLocation();
  return (
    <nav className='navbar-nav'>
      <div className='d-flex justify-content-around'>
      <Link className={location.pathname.split('/')[2] === 'sales' ? 'LinkSelected' : 'Link' } to='/mi familia/sales'>Ventas</Link>
      <Link className={location.pathname.split('/')[2] === 'transactions' ? 'LinkSelected' : 'Link' } to='/mi familia/transactions'>Transacciones</Link>
      <Link className={location.pathname.split('/')[2] === 'products' ? 'LinkSelected' : 'Link' } to='/mi familia/products'>Productos</Link>
      </div>
    </nav>
  )
}

export default Navbar