import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'

const HeaderAdminResponsive = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <div className='d-block d-lg-none'>
         <div className='mb-2'>
         <Button
              onClick={() => {setOpen3(false); setOpen2(false); setOpen(!open); setOpen4(false);}}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Usuaris
            </Button>
            <Collapse className='my-4' in={open}>
              <div id="example-collapse-text">
                <Link className='d-block ms-2' title="Llistar Usuaris" to="">Llistar Usuaris</Link>
                <Link className='d-block ms-2' title="Afegir usuari" to="">Afegir usuari</Link>
              </div>
            </Collapse>
          </div>
         <div className='mb-2'>
         <Button
              onClick={() => {setOpen3(false); setOpen2(!open2); setOpen(false); setOpen4(false);}}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open2}
            >
              Jocs
            </Button>
            <Collapse className='my-4' in={open2}>
              <div id="example-collapse-text">
                <Link className='d-block ms-2' title="Llistar Jocs" to="">Llistar Jocs</Link>
                <Link className='d-block ms-2' title="Afegir joc" to="">Afegir joc</Link>
              </div>
            </Collapse>
          </div>
         <div className='mb-2'>
         <Button
              onClick={() =>{ 
                setOpen3(!open3); setOpen2(false); setOpen(false); setOpen4(false);
              }}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open3}
            >
              Generes
            </Button>
            <Collapse className='my-4' in={open3}>
              <div id="example-collapse-text">
                <Link className='d-block ms-2' title='Llistar generes' to="">Llistar generes</Link>
                <Link className='d-block ms-2' title='Afegir genere' to="">Afegir genere</Link>
              </div>
            </Collapse>
          </div>
         <div className='mb-2'>
         <Button
              onClick={() => {setOpen3(false); setOpen2(false); setOpen(false); setOpen4(!open4);}}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open4}
            >
              Plataformes
            </Button>
            <Collapse className='my-4' in={open4}>
              <div id="example-collapse-text">
                <Link className='d-block ms-2' to="">Llistar Plataformes</Link>
                <Link className='d-block ms-2' to="">Afegir plataforma</Link>
              </div>
            </Collapse>
          </div>
    </div>
  )
}

export default HeaderAdminResponsive