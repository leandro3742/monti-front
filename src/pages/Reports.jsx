import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Reports.css'

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
import Button from '@mui/material/Button';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const Reports = (props) => {
  const { openSpinner, closeSpinner } = props;
  const { business } = useParams()
  const [day, setDay] = React.useState(new Date().getDate());
  const [month, setMonth] = React.useState(new Date().getMonth())
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [total, setTotal] = React.useState(0)
  const [data, setData] = React.useState([]);
  
  const handleChange = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'day') setDay(event.target.value);
    if (event.target.name === 'month') {
      let aux = event.target.value;
      aux = months.indexOf(aux);
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
    openSpinner()
    let auxMonth = month
    if(month+1 < 10) auxMonth = '0'+(month+1)
    let resp = await fetch(`${import.meta.env.VITE_BACKEND}/business/getTransactions/${business}/${day}/${auxMonth}/${year}`)
    closeSpinner()
    if(resp.status === 200){
      resp = await resp.json()
      setData(resp.data.transactions)
    }
    else if(resp.status === 404){
      setData([])
    }
  }

  useEffect(()=> {
    getData()
  }, [])

  useEffect(()=> {
    getTotal(data)
  }, [data])
  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()} className='row m-0'>
        <TextField
          label='Dia'
          type='number'
          value={day}
          size='small'
          name='day'
          onChange={handleChange}
          className='m-auto col-3 col-lg-2 my-3'
        />

        <FormControl size='small' className='col-3 col-lg-2 m-auto my-3'>
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
          className='m-auto col-3 col-lg-2 my-3'
        />
      <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
        {day && month !== -1 && year && 
          <Button size='small' variant='contained' onClick={getData}>Ver transacciones</Button>
        }
      </div>
      </form>
      {data.length > 0 &&
      <div className='reports-table m-0'>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell align='center'>Producto</TableCell>
              <TableCell align="right">Valor $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elem) => (
              <TableRow
                key={elem.id}
              >
                <TableCell component="th" scope="row">
                  {elem.hour}
                </TableCell>
                <TableCell align="center">{elem.product}</TableCell>
                <TableCell align="right">${elem.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    }
    {data.length > 0 && 
      <div className='d-flex justify-content-center mx-2'>
        <span><b>Total:</b> ${total}</span>
      </div>
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

export default Reports