import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
const Employee = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { business } = useParams()
  const [price, setPrice] = useState()
  const { openSpinner, closeSpinner} = props

  const sendData = async(type)=>{
    let day = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    let minutes;
    new Date().getMinutes() < 10 ? minutes = '0' + new Date().getMinutes() : minutes = new Date().getMinutes()
    let hour = new Date().getHours() + ':' + minutes
    openSpinner()
    let resp = await fetch(`${import.meta.env.VITE_BACKEND}/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({hour: hour, type: type.toUpperCase(), value: price, day: day, business: business}),
    })
    closeSpinner()
    if(resp.status === 201){
      setPrice()
      enqueueSnackbar('Se guardo la transaccion', { variant: 'success' });
    }
    else{
      setPrice()
      enqueueSnackbar('Hubo un error, vuelva a intentarlo', { variant: 'error' });
    }
  }

  return (
    <div className="p-3">
    <h3 className="text-center">Agregar ventas - pagos</h3>
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <TextField type="number" size="small" label="Precio" variant="outlined" value={price ? price : ''} onChange={(e)=>setPrice(e.target.value)}/>
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