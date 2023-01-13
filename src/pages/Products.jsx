import React, { useState, useEffect } from 'react'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination } from '@mui/material';
import UpdateModal from '../components/UpdateModal';
import CreateModal from '../components/CreateModal';
import { useParams } from 'react-router-dom';

const Products = (props) => {
  const {business} = useParams()
  const {filters, label, openSpinner, closeSpinner } = props
  const [search, setSearch] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [filter, setFilter] = useState()
  const [selected, setSelected] = useState({})
  const [products, setProducts] = useState([])

  const filterProducts = async() => {
    openSpinner()
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/products/get/filter/${business}/${filter}`)
    const data = await response.json()
    closeSpinner()
    setProducts(data)
  }

  const getProducts = async() => {
    openSpinner()
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/business/getProducts/${business}`)
    const data = await response.json()
    closeSpinner()
    setProducts(data.products)
  }

  useEffect(() => {
    if(!openCreateModal || !openUpdateModal){
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
    if(response.statusCode > 300){
      alert('Error al eliminar el producto')
    }else{
      alert('Producto eliminado correctamente')
    }
    closeSpinner()
    getProducts()
  }

  useEffect(() => {
    if(filter){
      filterProducts()
    }
  }, [filter]);

  return (
    <div>
      <div className='d-flex justify-content-end my-2 mx-2'>
        <button className='btn btn-sm btn-info shadow' onClick={()=>setOpenCreateModal(true)}>Crear nuevo producto</button>
      </div>
      <div className='col-10 m-auto mt-3'>
        <div className='text-center d-flex justify-content-around shadow rounded bg-white'>
          <InputBase
            placeholder={`Buscar Producto`}
            inputProps={{ 'aria-label': 'Buscar Producto' }}
            onChange={(e)=>setSearch(e.target.value)} 
            value={search}
          />
          <IconButton type="submit"  aria-label="search" onClick={addFilter}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      {products.length === 0 && 
      <div className='col-10 m-auto mt-3 text-center'>
        <h5 className='mt-5'>No se encotró ningún producto</h5>
      </div>
      }
      {products.map((item, index) => {
        return (
          <div className='col-10 m-auto mt-3' key={index}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{item.name}</h5>
                <p className='card-text'>Precio: {item.price}</p>
                <p className='card-text'>Stock: {item.stock}</p>
              </div>
              <div className='d-flex justify-content-end p-3'>
                <button className='btn btn-primary btn-sm mx-3' onClick={()=>editComponet(item)}>Editar</button>
                <button className='btn btn-danger btn-sm' onClick={()=>deleteComponent(item)}>Eliminar</button>
              </div>
            </div>
          </div>
        )
      })}
      <UpdateModal business={business} show={openUpdateModal} setShow={setOpenUpdateModal} data={selected} openSpinner={openSpinner} closeSpinner={closeSpinner} />
      <CreateModal business={business} show={openCreateModal} setShow={setOpenCreateModal} openSpinner={openSpinner} closeSpinner={closeSpinner}/>
      {/* <Pagination /> */}
    </div>
  )
}

export default Products