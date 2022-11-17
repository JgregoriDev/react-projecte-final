import React, { useEffect, useState } from 'react'
import { useLocation,Link } from "react-router-dom";

function Buscar() {
	const search = useLocation().search;
	let buscar = new URLSearchParams(search).get("buscar");
  const [Valor, setValor] = useState("");
  const [ArrayVideojocs, setArrayVideojocs] = useState("");


  useEffect(() => {
    setValor(window.location.pathname.split("/")[2]);
    console.log(window.location.pathname.split("/")[2]);
    buscarPerText();
  console.log(window.location.pathname.split("/")[2]);
  }, []);
  const buscarPerText=async()=>{
    const response=await fetch(`http://vos.es/api/v1/videojoc/buscar/${buscar}`);
    const arrayBusqueda=await response.json();
    console.log(arrayBusqueda);
    setArrayVideojocs(arrayBusqueda.Resultat);
  }
  
  return (
    <div className='row'>
      <div className="col-2"></div>
      <div className="col-8">
        <h1>Buscar videojoc amb titol {Valor}</h1>
        <h3>{ArrayVideojocs.length>0?"Resultats de busqueda":"No s'han trobat resultats"}</h3>
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