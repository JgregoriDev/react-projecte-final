import React,{useEffect} from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate } from 'react-router-dom'

const PagoRealitzat = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const token= localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      console.log(decoded);

       if (!decoded.roles.includes("ROLE_USER")  || !decoded.roles.includes("ROLE_ADMIN")) {
         navigate(`/`);
       }
      //  InsertarPago()
      //  .then((result) => {
      //    console.log(result);
      //  }).catch((err) => {
      //    console.error(err);
      //  });
    }else{
      navigate(`/`);
    }
  
    
  }, [])
  
  const InsertarPago=async()=>{
    const response= await fetch();
    const resultat= await response.json();
    return resultat;
  }

  return (
    <div>
      <h1>Pago realitzat de manera satisfactoria</h1>\

    </div>
  )
}

export default PagoRealitzat