import React from 'react'
import '../styles/Spinner.css'

const Spinner = (props) => {
  const {show} = props
  return (
    <>
      {show &&
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>
      }
    </>
  )
}

export default Spinner