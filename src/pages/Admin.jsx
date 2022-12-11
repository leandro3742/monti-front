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

const Admin = () => {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  const [total, setTotal] = React.useState(0)
  const [data, setData] = React.useState([]);
  
  const handleChange = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'day') setDay(event.target.value);
    if (event.target.name === 'month') {
      console.log('entra')
      let aux = event.target.value;
      aux = months.indexOf(aux);
      console.log(aux)
      setMonth(aux);
    }
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
    let resp = await fetch(`${import.meta.env.VITE_URL_BACK}/transaction/get/${day}/${month+1}/${year}`)
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
  console.log(months[month])
  return (
    <div className='row m-0'>
      <TextField
        label='Dia'
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
          value={month!=='' ? months[month] : ""}
          onChange={handleChange}
          name="month"
          autoWidth
          label="Mes"
        >
          {months.map((elem, value) => {
            return <MenuItem value={elem} key={elem}>
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
        {day && month && year && 
          <button className='btn btn-md btn-primary' onClick={getData}>Ver transacciones</button>
        }
      </div>
      {data.length > 0 &&
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora</TableCell>
            <TableCell align="center">Transaccion </TableCell>
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
              <TableCell align="center" style={{color: elem.type.toUpperCase() === 'PAGO' ? 'red' : 'green'}}>{elem.type}</TableCell>
              <TableCell align="right">${elem.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='d-flex justify-content-end mx-2'>
          <span><b>Total:</b> ${total}</span>
      </div>
    </TableContainer>
    }
    {data.length === 0 && 
      <div className='px-2 mt-5'>
        <TableContainer component={Paper} className="p-3 d-flex justify-content-center align-items-center">
            <h5 className='m-auto text-center'>No hay transacciones para este día</h5>
        </TableContainer>
      </div>
    }
    </div>
  )
}

export default Admin