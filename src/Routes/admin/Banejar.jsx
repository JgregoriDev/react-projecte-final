import React, { useEffect } from 'react'
import { NavItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Banejar = () => {
  let token = '';
  const navigate= useNavigate();
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token")).token;
    const estatUsuari=banejarUsuari();
    estatUsuari
    .then((resultat)=>{
      navigate("/admin");
    })
    .catch((err)=>{
      console.error(err);
    })


  }, []);
  const banejarUsuari = async () => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${ token }`,
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "ban":true
     });
     const id=window.location.pathname.split("/")[2];
     let response = await fetch(`http://vos.es/api/v1/usuari/${id}/banejar`, { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
     return data;
     
  }
  
  return (
    <div>Banejar</div>
  )
}

export default Banejar