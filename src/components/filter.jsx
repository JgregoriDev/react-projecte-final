import React from 'react'

function filter() {
  return (
    <div className='row my-2'>
      	<form className="d-lg-flex flex-column flex-lg-row"  action="" method="get">
							<div className={``}>
							<label className="d-block" htmlFor="orden">Orden</label>
							<select className="form-select" name="orden" id="">
								<option value="ASC">Asc</option>
								<option value="DESC">Desc</option>
							</select>
							</div>
							<div className={`my-2 my-lg-0 mx-2`}>
							<label htmlFor="orden">Orden</label>
							<select className="form-select" name="filtrar" id="filtrar">
								<option value="id">identificador</option>
								<option value="preu">preu</option>
								<option value="fechaEstreno">Fecha estrenamenta</option>
							</select>
							</div>
						<div className=" d-flex justify-content-center align-items-end">
						<button className="btn btn-primary d-block">Filtrar</button>
						</div>
						</form>
    </div>
  )
}

export default filter