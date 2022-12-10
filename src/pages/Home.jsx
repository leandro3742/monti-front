import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/'>Empleado</Link>
      <Link to='/admin'>Admin</Link>
      
    </div>
  )
}

export default Home