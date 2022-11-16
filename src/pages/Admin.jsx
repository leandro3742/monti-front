import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const mock = [
  {
    type: "gasto", 
    value: 300,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  },
  {
    type: "venta", 
    value: 200,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  },
  {
    type: "venta", 
    value: 1900,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  },
  {
    type: "gasto", 
    value: 670,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  },
  {
    type: "venta", 
    value: 423,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  },
  {
    type: "gasto", 
    value: 300,
    hour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  }, 
]
const Admin = () => {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  const [total, setTotal] = React.useState(0)
  const [data, setData] = React.useState([]);

  const handleChange = (event) => {
    if (event.target.name === 'day') setDay(event.target.value);
    if (event.target.name === 'month') setMonth(event.target.value);
    if (event.target.name === 'year') setYear(event.target.value);
  };

  const getTotal = (prop) => {
    let subTotal = total
    prop.map(elem => {
      elem.type === 'pago' ? subTotal -= elem.value : subTotal += elem.value
    })
    setTotal(subTotal)
  }

  const getData = async() => {
    let resp = await fetch('http://localhost:3000/transaction/get')
    if(resp.status === 200){
      resp = await resp.json()
      setData(resp)
    }
  }

  useEffect(()=> {
    getData()
  }, [])

  useEffect(()=> {
    getTotal(data)
  }, [data])

  return (
    <div className='row m-0'>
      <TextField
        label='Day'
        type='number'
        value={day}
        size='small'
        name='day'
        onChange={handleChange}
        className='m-auto col-8 my-3'
      />

      <FormControl sx={{ m: 1, minWidth: 120 }} size='small' className='col-8 m-auto my-3'>
        <InputLabel>Mes</InputLabel>
        <Select
          value={month}
          onChange={handleChange}
          name="month"
          autoWidth
          label="Mes"
        >
          {months.map((elem, value) => {
            return <MenuItem value={value+1} key={value}>
              {elem}
            </MenuItem>
          })}
        </Select>
      </FormControl>

      <TextField
        label='Año'
        type='number'
        name='year'
        size='small'
        value={year}
        onChange={handleChange}
        className='m-auto col-8 my-3'
      />

      <div className='d-flex justify-content-center'>
        <button className='btn btn-md btn-primary'>Ver transacciones</button>
      </div>

      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora</TableCell>
            <TableCell align="right">Transaccion </TableCell>
            <TableCell align="right">Valor $</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((elem) => (
            <TableRow
              key={elem.name}
            >
              <TableCell component="th" scope="row">
                {elem.hour}
              </TableCell>
              <TableCell align="center">{elem.type}</TableCell>
              <TableCell align="right">{elem.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='d-flex justify-content-end mx-2'>
          <span><b>Total:</b> ${total}</span>
      </div>
    </TableContainer>
    </div>
  )
}

export default Admin