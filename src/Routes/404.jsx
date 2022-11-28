import React from 'react'

import useTitle from "../Hooks/useTitle";
const Notfound = ({title}) => {
  useTitle(title);
  return (
    <div className=''>
      <span className='notFound'>404 - Ruta no trobada</span>
      </div>
  )
}

export default Notfound