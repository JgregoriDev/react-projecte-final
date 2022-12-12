import React from 'react'
import {Link } from 'react-router-dom'
import "../assets/style/Space.css"
const MapaWeb = () => {
  return (
    <div className='container-fluid h-75-vh'>
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <h1>Mapa web</h1>
          <ul>
            <li><Link to={"/mapa"}>Mapa web</Link></li>
            <li><Link to={"/"}>Inici</Link></li>
            <li><Link to={"/sobre-nosaltres"}>Sobre nosaltres</Link></li>
            <li><Link to={"/"}>Administrar usuaris</Link></li>
            <li><Link to={"/galletes"}>Sobre les galletes</Link></li>
            <li><Link to={"/"}>Joc nou</Link></li>
            <li><Link to={"/FAQ"}>FAQ</Link></li>
            <li><Link to={"/admin/joc/nou"}>Joc nou</Link></li>
            <li><Link to={"/plataforma/6"}>Plataforma nintendo switch</Link></li>
            <li><Link to={"/videojoc/Temtem"}>Videojoc Temtem</Link></li>
            <li><Link to={"/carret"}>Carret</Link></li>
          </ul>
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div>
  )
}

export default MapaWeb