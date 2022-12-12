import React, { useEffect } from 'react'
import { NavItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import "../../assets/style/Space.css";
import jwt_decode from 'jwt-decode';

const Banejar = () => {
  let token = '';
  const navigate = useNavigate();
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token")).token;
    const role=jwt_decode(token)
    const estatUsuari = banejarUsuari();
    estatUsuari
      .then((resultat) => {
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
      })


  }, []);
  const banejarUsuari = async () => {
    let headersList = {
      "Accept": "*/*",
      
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "ban": true
    });
    const id = window.location.pathname.split("/")[2];
    //  let response = await fetch(`http://vos.es/api/v1/usuari/${id}/banejar`, { 
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}usuari/${id}/banejar`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.text();
    return data;

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <div className='h-75-vh'>Banejar</div>

        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div>
  )
}

export default Banejar