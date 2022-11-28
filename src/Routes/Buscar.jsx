import React, { useEffect, useState } from 'react'
import { useLocation,Link } from "react-router-dom";

import useTitle from "../Hooks/useTitle";
function Buscar({title}) {
  useTitle(title);
  const location = useLocation();
	const search = useLocation().search;
	let buscar = new URLSearchParams(search).get("q");
  const [Valor, setValor] = useState("");
  const [ArrayVideojocs, setArrayVideojocs] = useState("");


  useEffect(() => {
    setValor(window.location.pathname.split("/")[2]);
    console.log(window.location.pathname.split("/")[2]);
    buscarPerText();
  console.log(window.location.pathname.split("/")[2]);
  }, [Valor]);
  const buscarPerText=async()=>{
    // const response=await fetch(`http://vos.es/api/v1/videojoc/buscar/${Valor}`);
    const response=await fetch(`https://app.11josep.daw.iesevalorpego.es/api/v1/videojoc/buscar/${Valor}`);
    const arrayBusqueda=await response.json();
    console.log(arrayBusqueda);
    setArrayVideojocs(arrayBusqueda.Resultat);
  }
  
  return (
    <div className='row'>
      <div className="col-2"></div>
      <div className="col-8">
        <h1>Buscar videojoc amb titol {Valor}</h1>
        <h3>{ArrayVideojocs && ArrayVideojocs.length>0?"Resultats de busqueda":"No s'han trobat resultats"}</h3>
        {ArrayVideojocs && ArrayVideojocs.map((joc)=>{
          return(
            <>
              <div key={joc.id} className='mb-4'>
                <Link  to={`/videojoc/${joc.id}`}>{joc.id} - {joc.titul}</Link>
                <p>{joc.descripcio}</p>
              </div>
            </>
          )
        })}
      </div>
      <div className="col-2"></div>
    </div>
  )
}

export default Buscar