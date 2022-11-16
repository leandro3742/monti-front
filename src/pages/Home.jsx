import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/admin'>Admin</Link>
      <Link to='/employee'>Empleado</Link>
    </div>
  )
}

export default Home