import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Products.css'
import { useSnackbar } from 'notistack';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import UpdateModal from '../components/UpdateModal';
import CreateModal from '../components/CreateModal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineSharpIcon from '@mui/icons-material/DriveFileRenameOutlineSharp';

const Products = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { business } = useParams()
  const { filters, label, openSpinner, closeSpinner } = props
  const [search, setSearch] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [filter, setFilter] = useState()
  const [selected, setSelected] = useState({})
  const [products, setProducts] = useState([])

  const filterProducts = async () => {
    openSpinner()
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/products/get/filter/${business}/${filter}`)
    const data = await response.json()
    closeSpinner()
    setProducts(data)
  }

  const getProducts = async () => {
    openSpinner()
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/business/getProducts/${business}`)
    const data = await response.json()
    closeSpinner()
    if (data.status !== 200) return enqueueSnackbar('Error al obtener los productos', { variant: 'error' })
    else setProducts(data.data.products)
  }

  useEffect(() => {
    if (!openCreateModal || !openUpdateModal) {
      getProducts()
    }
  }, [openCreateModal, openUpdateModal]);

  const addFilter = () => {
    setFilter(search.toUpperCase())
  }

  const editComponet = (item) => {
    setSelected(item)
    setOpenUpdateModal(true)
  }

  const deleteComponent = async (item) => {
    openSpinner()
    let response;
    await fetch(`${import.meta.env.VITE_BACKEND}/products/delete/${item.name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => response = await res.json())
    if (response.statusCode > 300) {
      enqueueSnackbar('Error al eliminar el producto', { variant: 'error' })
    } else {
      enqueueSnackbar('Producto eliminado correctamente', { variant: 'success' })
    }
    closeSpinner()
    getProducts()
  }

  useEffect(() => {
    if (filter) {
      filterProducts()
    }
  }, [filter]);

  return (
    <div>
      <section className='products-header'>
        <div className='products-create'>
          <Button size='small' variant='contained' onClick={() => setOpenCreateModal(true)}>Crear producto</Button>
        </div>
        <div className='col-lg-4 col-10 m-auto mt-3'>
          <div className='text-center d-flex justify-content-around shadow rounded bg-white'>
            <InputBase
              placeholder={`Buscar Producto`}
              inputProps={{ 'aria-label': 'Buscar Producto' }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IconButton type="submit" aria-label="search" onClick={addFilter}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </section>
      {products.length === 0 &&
        <div className='col-10 m-auto mt-3 text-center'>
          <h5 className='mt-5'>No se encotró ningún producto</h5>
        </div>
      }
      <section className='row m-0 d-flex justify-content-around'>
        {products.map((item, index) => {
          return (
            <div className='products-card p-0' key={item.name}>
              <div className='products-card-text'>
                <h3>{item.name}</h3>
                <p><b>Precio: </b>${item.price}</p>
                <p><b>Stock: </b>{item.stock}</p>
              </div>
              <div className='products-card-buttons'>
                {window.screen.width > 768
                  ?
                  <Button variant='contained' startIcon={<DeleteIcon size="small" />} onClick={() => deleteComponent(item)}>eliminar</Button>
                  :
                  <Button variant='contained' onClick={() => deleteComponent(item)}><DeleteIcon size="small" /></Button>
                }
                {window.screen.width > 768
                  ?
                  <Button variant='contained' onClick={() => editComponet(item)} startIcon={<DriveFileRenameOutlineSharpIcon />}>Editar</Button>
                  :
                  <Button variant='contained' onClick={() => editComponet(item)}><DriveFileRenameOutlineSharpIcon /></Button>
                }
              </div>
            </div>
          )
        })}
      </section>
      <UpdateModal business={business} show={openUpdateModal} setShow={setOpenUpdateModal} data={selected} openSpinner={openSpinner} closeSpinner={closeSpinner} />
      <CreateModal business={business} show={openCreateModal} setShow={setOpenCreateModal} openSpinner={openSpinner} closeSpinner={closeSpinner} />
    </div>
  )
}

export default Products