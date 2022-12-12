import React from 'react'
import {Link } from 'react-router-dom'

const MapaWeb = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <h1>Mapa web</h1>
          <ul>
            <li><Link to={"/"}>Mapa web</Link></li>
            <li><Link to={"/"}>Inici</Link></li>
            <li><Link to={"/"}>Sobre nosaltres</Link></li>
            <li><Link to={"/"}>Administrar usuaris</Link></li>
            <li><Link to={"/"}>Sobre les galletes</Link></li>
            <li><Link to={"/"}>Joc nou</Link></li>
            <li><Link to={"/"}>FAQ</Link></li>
            <li><Link to={"/"}>Plataforma nintendo switch</Link></li>
            <li><Link to={"/"}>Videojoc Temtem</Link></li>
            <li><Link to={"/"}>Carret</Link></li>
            <li><Link to={"/"}>Sobre les galletes</Link></li>
          </ul>
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div>
  )
}

export default MapaWeb