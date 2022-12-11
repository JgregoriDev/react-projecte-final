import React, { useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom";
import "../assets/style/Space.css"
import useTitle from "../Hooks/useTitle";
import SearchBar from '../components/search';
import FilterPreu from "../components/Filtratge";

function Buscar({ title }) {
  useTitle(title);
  const location = useLocation();
  const search = useLocation().search;
  let buscar = new URLSearchParams(search).get("q");
  const [Valor, setValor] = useState("");
  const [ArrayVideojocs, setArrayVideojocs] = useState("");


  useEffect(() => {
    setValor(window.location.pathname.split("/")[2]);
    // console.log(window.location.pathname.split("/")[2]);
    buscarPerText();
    // console.log(window.location.pathname.split("/")[2]);
  }, [Valor]);
  const buscarPerText = async () => {
    // const response=await fetch(`http://vos.es/api/v1/videojoc/buscar/${Valor}`);
    const response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/buscar/${Valor}`);
    const arrayBusqueda = await response.json();
    console.log(arrayBusqueda);
    setArrayVideojocs(arrayBusqueda.Resultat);
  }

  return (
    <div className='row'>
      <div className="col-12 col-lg-2"></div>
      <div className="col-12 col-lg-8  h-75-vh">
        <div className="d-block m-3 d-lg-none">
          <SearchBar width={`w-100`}></SearchBar>
          <FilterPreu width={`w-100`} />
        </div>
        <h1>Buscar videojoc amb titol {Valor}</h1>
        <h3>{ArrayVideojocs && ArrayVideojocs.length > 0 ? "Resultats de busqueda" : "No s'han trobat resultats"}</h3>
        {ArrayVideojocs && ArrayVideojocs.map((joc) => {
          return (
            <>
              <div key={joc.id} className='mb-4'>
                <Link to={`/videojoc/${joc.titul}`}>{joc.id} - {joc.titul}</Link>
                <p>{joc.descripcio}</p>
              </div>
            </>
          )
        })}
      </div>
      <div className="col-12 col-lg-2">
        <div className="d-none d-lg-flex flex-column">
          {/* Blog de busqueda i filtratge per preu només sera visible en tamany tablet */}
          <SearchBar width={`w-75`}></SearchBar>
          <FilterPreu width={`w-75`} />
        </div>
      </div>
    </div>
  )
}

export default Buscar