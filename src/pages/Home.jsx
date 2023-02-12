import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../components/Login'
import '../styles/Home.css'
const Home = () => {
  return (
    <div className='home-main'>
      <Login />
    </div>
  )
}

export default Home