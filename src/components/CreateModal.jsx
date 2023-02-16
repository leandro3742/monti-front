import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { TextField } from '@mui/material';
import _ from 'lodash';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
const CreateModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { show, setShow, openSpinner, closeSpinner, business } = props;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [code, setCode] = useState('')

  useEffect(() => {
    setName('');
    setPrice('');
    setStock('');
    setCode('')
  }, [show]);

  const saveChanges = async () => {
    const newData = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      code: parseInt(code),
      business
    }
    let response;
    openSpinner()
    await fetch(`${import.meta.env.VITE_BACKEND}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }).then(async res => response = await res.json());
    if (response.statusCode > 300) {
      enqueueSnackbar('Error al crear el producto', { variant: 'error' })
    }
    else {
      enqueueSnackbar('Producto creado correctamente', { variant: 'success' })
    }
    closeSpinner()
    setShow(false);
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Crear producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex flex-column align-items-center'>
          <TextField size='small' label='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
          <TextField className='my-3' size='small' type='number' label='Precio' value={price} onChange={(e) => setPrice(e.target.value)} />
          <TextField size='small' type='number' label='Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
          <TextField className='my-3' size='small' label='Código de barra' value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
      </Modal.Body>
      <Modal.Footer>

        <Button variant='contained' size='small' onClick={() => setShow(false)} className='mx-3'>
          Cancelar
        </Button>
        <Button variant='contained' size='small' color='success' onClick={saveChanges}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateModal