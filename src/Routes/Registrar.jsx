import React, { useState } from 'react';

const plan = {
  "email": "",
  "password": "",
  "passwordb": ""
}
const errorsMissatges = {
  "email": "",
  "password": "",
  "passwordb": "",
  "respostaServer": ""
}
const Registrar = () => {
  const [Plantilla, setPlantilla] = useState(plan);
  const [ErrorMissatges, setErrorsMissatges] = useState(errorsMissatges);
  const [Personalization, setPersonalization] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setErrorsMissatges(errorsMissatges);
    let error = false;
    if (Plantilla.password !== Plantilla.passwordb) {
      error = true;
      ErrorMissatges.passwordb = "El camp contrasenya y repetir contrasenya han de tindre la mateixa contrasenya";
    }
    if (Plantilla.password.length < 5 || Plantilla.password.length > 50) {
      error = true;
      ErrorMissatges.password = "El camp contrasenya ha de tindre minim 5 caracters i com a maxim 80 caracters";
    }

    if (Plantilla.passwordb.length < 5 || Plantilla.passwordb.length > 50) {
      error = true;
      ErrorMissatges.passwordb = "El camp repetir contrasenya ha de tindre minim 5 caracters i com a maxim 80 caracters";
    }

    if (Plantilla.email.length < 4 || Plantilla.email.length > 60) {
      error = true;
      ErrorMissatges.email("El camp email ha de tindre minim 5 caracters i com a maxim 80 caracters");

    }

    if (error) {
      setErrorsMissatges(ErrorMissatges);
      return;
    } else {
      const data = registrarUsuari();
      data.then((result) => {
        console.log(result);
        if (result.Title === "usuari registrat") {
          ErrorMissatges.respostaServer = result?.Title;
          setErrorsMissatges(ErrorMissatges);
          setPersonalization("text-success");
        }
        if (result.code === 500) {
          ErrorMissatges.respostaServer = "Aquest correu ja esta en us";
          setErrorsMissatges(ErrorMissatges);
          setPersonalization("text-danger");
        }
      }).catch((err) => {
        console.error(err.code);
      });
    }
  }

  const registrarUsuari = async () => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "email": Plantilla.email,
      "password": Plantilla.password
    });

    let response = await fetch("http://vos.es/api/v1/registrar", {
      //let response = await fetch("https://app.11josep.daw.iesevalorpego.es/api/v1/registrar", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    return data;

  }
  const onChange = (e) => {
    if (e.currentTarget.id === "email")
      Plantilla.email = e.target.value;
    if (e.currentTarget.id === "contrasenya")
      Plantilla.password = e.target.value;
    if (e.currentTarget.id === "contrasenyab")
      Plantilla.passwordb = e.target.value;
    setPlantilla(Plantilla);

    console.log(Plantilla);
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
              <input type="text" className='form-control' onChange={(e) => onChange(e)} name="email" id="email" />
              <small className="text-danger">  {ErrorMissatges?.email}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenya">Contrasenya</label>
              <input type="password" className='form-control' onChange={(e) => onChange(e)} name="contrasenya" id="contrasenya" />
              <small className="text-danger">{ErrorMissatges?.password}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenyab">Repeteix la contrasenya</label>
              <input type="password" className='form-control' onChange={(e) => onChange(e)} name="contrasenyab" id="contrasenyab" />
              <small className="text-danger">    {ErrorMissatges?.passwordb}</small>
            </div>
            <div className="mb-3 text-center">
              <button className='btn btn-primary' type="submit">Registrar</button>
            </div>
            <div className={`mb-3 text-cebter ${Personalization}`}>
              {ErrorMissatges.respostaServer}
            </div>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Registrar