import React from 'react'
import { useNavigate } from "react-router-dom";
const Filtratge = () => {


  const navigate=useNavigate();
  const onSubmit = (e)=> {
    e.preventDefault();
    console.log("submit");
    navigate(`/filtrar/${e.target[0].value}/${e.target[1].value}`)

  }
  return (
    <>
    <div className=''>
      &nbsp;
    </div>
    <div className=''>
      <h5>Filtrar per preu</h5> 
      <form action="" onSubmit={(e)=>{onSubmit(e)}} method="get">
        <label>Desde</label>
        <input type="text" placeholder='min' className='form-control w-75 my-2 me-1' name="filtrarMin" id="filtrarMin" />
        <label>Hasta</label>
        <input type="text" placeholder='max' className='form-control w-75 my-2 me-1' name="filtrarMax" id="filtrarMax" />
        <button className='btn btn-primary text-center' type="submit">Filtrar per preu</button>
      </form>
    </div>
    </>
  )
}

export default Filtratge