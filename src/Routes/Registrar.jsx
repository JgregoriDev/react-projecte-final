import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const plan = {
  "email": "",
  "password": "",
  "passwordb": ""
}
const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .required("El camp email es un camp requerit")
    .min(3, "El camp email ha de contindre mínim 3 caràcters")
    .max(200, "El camp email ha de tindre màxim 200 caràcters"),
  passwordA: yup
    .string()
    .required("El camp contrasenya es un camp requerit")
    .min(6, "El camp contrasenya ha de contindre mínim 6 caràcters")
    .max(200, "El contrasenya  ha de tindre mínim 200 caràcters"),
  passwordB: yup
    .string()
    .required("El camp repeteix contrasenya es un camp requerit")
    .oneOf([yup.ref('passwordA'), null], 'Les contrasenyes deuen ser exactament igual')
    .min(6, "El camp repetir contrasenya ha de contindre mínim 6 caràcters")
    .max(200, "El camp repetir contrasenya  ha de tindre mínim 200 caràcters"),

});

const Registrar = () => {
  const [Plantilla, setPlantilla] = useState(plan);
  const [Personalization, setPersonalization] = useState("");
  const [ErrorMissatges, setErrorsMissatges] = useState({ respostaServer: "" });

  let token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate(`/`);
    }
  }, [])

  const onSubmit = (data) => {

    // if (false) {
    //   setErrorsMissatges(ErrorMissatges);
    //   return;
    // } else {

    console.log(data);
    const resposta = registrarUsuari(data);
    resposta.then((result) => {
      if (result.Title === "usuari registrat") {
        ErrorMissatges.respostaServer = result?.Title;
        setErrorsMissatges({respostaServer:"Usuari registrat de manera correcta"});
        setPersonalization("text-success");
      }
      if (result?.code === 500) {
        if (result?.message.includes("Duplicate entry")){
          setErrorsMissatges({ respostaServer: "Aquest correu ja està en ús" });

        }
        setPersonalization("text-danger");
      }
    }).catch((err) => {
      console.error(err.code);
    });

  }

  const registrarUsuari = async (objecte) => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "email": objecte?.email,
      "password": objecte?.passwordA
    });

    // let response = await fetch("http://vos.es/api/v1/registrar", {
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}registrar`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    return data;

  }


  return (
    <div className='container-fluid h-75-vh'>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1>Usuaris</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="text" className='form-control' {...register("email")} />
              {errors.email && <small className='text-danger'>{errors.email.message}</small>}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenya">Contrasenya</label>
              <input type="password" className='form-control' {...register("passwordA")} />
              {errors.passwordA && <small className='text-danger'>{errors.passwordA.message}</small>}
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenyab">Repeteix la contrasenya</label>
              <input type="password" className='form-control' {...register("passwordB")} />
              {errors.passwordB && <small className='text-danger'>{errors.passwordB.message}</small>}
            </div>
            <div className="mb-3 text-center">
              <button className='btn btn-primary' type="submit">Registrar</button>
            </div>
            <div className={`mb-3 text-cebter ${Personalization}`}>
              {ErrorMissatges?.respostaServer}
            </div>
          </form>

        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Registrar