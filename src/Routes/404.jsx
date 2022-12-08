import React from 'react'
import Image404 from "../assets/images/404.png"
import useTitle from "../Hooks/useTitle";
const Notfound = ({title}) => {
  useTitle(title);
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
        <p className='notFound'>404 - Ruta no trobada</p>
        <img src={Image404} className="my-5 w-100 h-auto" alt="404 not found" />
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
      </div>
  )
}

export default Notfound