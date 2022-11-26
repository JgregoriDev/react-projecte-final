import React from 'react'
import { useNavigate } from "react-router-dom";
const Filtratge = ({width}) => {


  const navigate=useNavigate();
  const onSubmit = (e)=> {
    e.preventDefault();
    console.log("submit");
    navigate(`/filtrar/${e.target[0].value}/${e.target[1].value}`)

  }

  const onChange=(e)=>{
    console.log(e.target[0].value);
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
        {/* <input type="text" placeholder='min' className='form-control w-75 my-2 me-1' name="filtrarMin" id="filtrarMin" /> */}
        <select defaultValue={0} onChange={onChange} className={`form-control form-select ${width}`} name="filtrarMin" id="filtrarMin">
          <option>0</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
          <option value={250}>250</option>
          <option value={300}>300</option>
        </select> 
        <label>Hasta</label>
        <select defaultValue={300} className={`form-control form-select ${width} mb-2`} name="filtrarMax" id="filtrarMax">
          <option value={0}>0</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
          <option value={250}>250</option>
          <option value={300}>300</option>
        </select> 

        <button className={`btn btn-primary ${width} `} type="submit"  title="Filtrar per preu"><i className="bi bi-cash-coin"></i></button>
      </form>
    </div>
    </>
  )
}

export default Filtratge