import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Sales.css'
// Material UI
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

// Api
import { apiCreateSales } from '../api/transactions';

import { useSnackbar } from 'notistack';
import { DtoTransaction } from '../dto/DtoTransaction';
import { createDate } from '../assets/index';
const Sales = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { business } = useParams()
  const { openSpinner, closeSpinner } = props
  const [products, setProducts] = React.useState([])
  const [showProducts, setShowProducts] = React.useState([])
  const [listOfSales, setListOfSales] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [otherPrice, setOtherPrice] = React.useState(0)
  const addItem = (item) => {
    let exist = false
    const newList = listOfSales.map(elem => {
      if (elem.name === item.name) {
        elem.cant += 1
        exist = true
      }
      return elem
    })
    if (!exist) newList.push({ name: item.name, cant: 1, price: item.price })
    setListOfSales(newList)
    setOtherPrice(0)
  }

  const removeItem = (itemName) => {
    const newList = listOfSales.map(elem => {
      if (elem.name === itemName) {
        if (elem.cant === 1) return null
        else elem.cant -= 1

      }
      return elem
    })

    setListOfSales(newList.filter(elem => elem !== null))
  }

  const filterProducts = () => {
    setShowProducts(products.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase())))
  }

  const getProducts = async () => {
    openSpinner()
    let resp = await fetch(`${import.meta.env.VITE_BACKEND}/business/getProducts/${business}`)
    resp = await resp.json()
    if (resp.status === 200) {
      setProducts(resp.data.products)
      setShowProducts(resp.data.products)
    }
    closeSpinner()
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  React.useEffect(() => {
    filterProducts()
  }, [search])

  const saveSale = async () => {
    openSpinner()
    let salesArr = []
    // Create an hour and date
    let date = createDate()
    listOfSales.forEach((elem) => {
      let transaction = new DtoTransaction(date.hour, date.day, elem.name, elem.price, 'Venta', business)
      for (let i = 0; i < elem.cant; i++) {
        salesArr.push(transaction)
      }
    })

    const res = await apiCreateSales({ sales: salesArr, business })
    if (res.status === 200) {
      enqueueSnackbar('Venta realizada con éxito', { variant: 'success' })
      setListOfSales([])
    }
    else enqueueSnackbar('Error al realizar la venta', { variant: 'error' })
    closeSpinner()
  }

  const showIfCode = (e) => {
    e.preventDefault()
    let aux = +search
    if (aux) {
      let item = products.find(elem => elem.code == aux)
      if (item) {
        addItem(item)
        setSearch('')
      }
      else enqueueSnackbar('No se encontró el producto', { variant: 'error' })
    }
  }
  return (
    <div className='row m-0'>
      <section className='col-12 col-lg-6 m-0'>
        <div className='sales-title'>
          <h1 className='text-center'>Lista de productos</h1>
          <form onSubmit={showIfCode} style={{ border: '1px solid white', width: '300px', height: '40px' }} className='d-flex justify-content-center m-auto rounded border border-2 mb-2' >
            <InputBase
              placeholder={`Buscar Producto`}
              inputProps={{ 'aria-label': 'Buscar cliente' }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IconButton type="submit" aria-label="search" >
              <SearchIcon />
            </IconButton>
          </form>
        </div>
        <section className='sales-list border border-2 rounded'>
          {showProducts.length === 0 && <p className='text-center'>No hay productos</p>}

          {showProducts.map((item, index) => {
            return (
              <div className='m-auto col-10 my-1 p-1' key={index}>
                <div className=''>
                  <div className='d-flex justify-content-between'>
                    <span className='card-title'><b>{item.name}</b></span>
                    <div>
                      <Button variant='contained' size='small' onClick={() => addItem(item)}>Agregar</Button>
                    </div>
                  </div>
                  <p className='m-0'>Precio: ${item.price}</p>
                </div>
                <hr />
              </div>
            )
          })}
        </section>
        <div className='d-flex justify-content-center'>
          {/* <div className='d-flex align-items-center mt-2'> */}
          <TextField fullWidth label='Precio' size='small' type={'number'} onChange={(e) => setOtherPrice(e.target.value)} value={otherPrice} />
          <Button className='mx-2' variant='contained' size='small' onClick={() => addItem({ name: "Otro", cant: 1, price: otherPrice })}>Agregar</Button>
          {/* </div> */}
        </div>
      </section>

      {listOfSales.length > 0 &&
        <section className='m-0 col-12 col-lg-6' >
          <div className='sales-title'>
            <h1 className='text-center'>Lista de compras</h1>
          </div>
          <div className='sales-list'>
            {listOfSales.length === 0 && <p className='text-center'>No hay productos</p>}
            <Table>
              <TableHead>
                <TableRow className='sales-table-header'>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfSales.map((elem) => (
                  <TableRow
                    key={elem.name}
                  >
                    <TableCell component="th" scope="row">
                      {elem.name}
                    </TableCell>
                    <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <RemoveIcon onClick={() => removeItem(elem.name)} />
                      <p className='mx-2'>{elem.cant}</p>
                      <AddIcon onClick={() => addItem(elem)} />
                    </TableCell>
                    <TableCell align="right">${elem.price * elem.cant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <section className='text-center my-2'>
            <p className='my-2'>
              <b>Total: $</b>
              {listOfSales.reduce((acc, elem) => acc + (elem.price * elem.cant), 0)}
            </p>
            <div className='d-flex justify-content-center'>
              {listOfSales.length > 0 && <Button variant='contained' color='success' size="small" onClick={saveSale}>Realizar venta</Button>}
            </div>
          </section>
        </section>
      }
    </div>
  )
}

export default Sales