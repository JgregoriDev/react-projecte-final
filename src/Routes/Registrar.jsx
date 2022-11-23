import React from 'react'
const Plantilla={
  "email":"",
  "password":"",
  "passwordb":""
}
const Registrar = () => {
  
  const onSubmit=(e)=>{
    console.log(e);
  }

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1>Usuaris</h1>
          <form action="" onSubmit={onSubmit} method="post">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="text" className='form-control' value={Plantilla.email} name="email" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenya">Contrasenya</label>
              <input type="password" className='form-control' value={Plantilla.password} name="contrasenya" id="contrasenya" />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenyab">Repeteix la contrasenya</label>
              <input type="password" className='form-control' value={Plantilla.passwordb} name="contrasenyab" id="contrasenyab" />
            </div>
            <div className="mb-3">
              <button type="submit">Registrar</button>
            </div>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Registrar