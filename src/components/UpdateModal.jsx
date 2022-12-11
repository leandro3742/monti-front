import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { TextField } from '@mui/material';
import _ from 'lodash';

const UpdateModal = (props) => {
  const { show, setShow, data, openSpinner, closeSpinner } = props;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    console.log(data)
    if(!_.isEmpty(data)){
      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
    }
  }, [data]);

  const saveChanges = async () => {
    const newData = {
      name,
      price,
      stock
    }
    let response;
    openSpinner()
    await fetch(`${import.meta.env.VITE_BACKEND}/products/update/${data.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }).then(async res => response = await res.json());
    if(response.statusCode > 300 )
      alert('Error al editar el producto')
    else
      alert('Producto editado correctamente')
    closeSpinner()
    setShow(false);
  }

  return (
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(data).length > 0 &&
            <div className='d-flex flex-column align-items-center'>
              <TextField disabled={true} size='small' label='Nombre' value={name} onChange={(e)=>setName(e.target.value)}/>
              <TextField className='my-3' size='small' type='number' label='Precio' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              <TextField size='small' type='number' label='Stock' value={stock} onChange={(e)=>setStock(e.target.value)}/>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <button onClick={()=>setShow(false)} className='btn btn-secondary btn-sm'>
            Cancelar
          </button>
          <button onClick={saveChanges} className='btn btn-success btn-sm'>
            Guardar cambios
          </button>
        </Modal.Footer>
      </Modal>
  )
}

export default UpdateModal