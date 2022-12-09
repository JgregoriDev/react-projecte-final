import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../assets/style/Space.css"
import "../assets/style/targeta.css";
import useTitle from "../Hooks/useTitle";
const FiltratgePreu = ({title}) => {
  useTitle(title)
  const [Titol, setTitol] = useState([]);
  const [Videojocs, setVideojocs] = useState([]);
  useEffect(() => {

    const valor = filteredPrice(window.location.pathname.split("/")[2], window.location.pathname.split("/")[3]);
    console.log(valor);
    valor.then((result) => {
     
      setTitol(result.Title);
      setVideojocs(result.Videojoc);
      console.log(Videojocs);
    }).catch((err) => {
      
    });

  }, [])

  const filteredPrice = async (min, max) => {
    // const result = await fetch(`http://vos.es/api/v1/videojoc/filtrar/preu/${min}/${max}`);
    const result = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/filtrar/preu/${min}/${max}`);
    const resultJSON = await result.json();
    return resultJSON;
  }
  return (
    <div>
      <div className='row'>
        <div className="col-2"></div>
        <div className="col-8 h-75-vh">

          <h1>{Titol}</h1>
          <div className="row">
          {Videojocs ? Videojocs.map((videojoc) => {
            return <div className='col-3 g-2 targeta' key={videojoc.id}>
                <Link to={`/videojoc/${videojoc.id}`}>
                <img src={`${videojoc.portada}`} className="w-100 h-auto" alt={videojoc.id} />
                  
                  </Link>
                  <p>Preu: {videojoc.preu} $</p>
                <h5><Link to={`/videojoc/${videojoc.id}`}>{videojoc.id} - {videojoc.titul}</Link></h5>
              </div>

          }) : ""}
          </div>

        </div>
        <div className="col-2"></div>
      </div>
      {/* <div>&npsb;</div> */}
    </div>
  )
}

export default FiltratgePreu