import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

const Employee = () => {
  const [price, setPrice] = useState()
  
  const sendData = async(type)=>{
    let hour = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    let resp = await fetch("http://localhost:3000/transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({hour: hour, type: type, value: price}),
    })
    if(resp.status === 201){
      setPrice()
      alert("Se guardo la transaccion")
    }
    else{
      setPrice()
      alert("Hubo un error, vuelva a intentarlo")
    }
  }

  return (
    <div className="p-3">
    <h3 className="text-center">Agregar ventas - pagos</h3>
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <TextField size="small" label="Precio" variant="outlined" value={price ? price : ''} onChange={(e)=>setPrice(e.target.value)}/>
      </div>
      <div className="d-flex justify-content-around mt-3">
        <button className="btn btn-danger btn-md" onClick={()=>sendData('pago')}>Pago</button>
        <button className="btn btn-success btn-md" onClick={()=>sendData('venta')}>Venta</button>
      </div>
    </div>
  </div>
  )
}

export default Employee