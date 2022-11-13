import React, { useState,useEffect } from 'react'

export const Plataforma = () => {
  const [Jocs, setJocs] = useState("");
  useEffect(() => {
    conseguirJocsPlataforma();
  
  }, [])
  const conseguirJocsPlataforma=async(id)=>{
    const response=await fetch(`http://vos.es/api/v1/plataforma/${window.location.pathname.split("/")[2]}`);
    const resultat=await response.json();
    setJocs(resultat.plataforma_videojocs)
    console.log(resultat);
  }

  return (
    <div className='container-fluis'><div className="row">
      <div className="col-2"></div>
      <div className="col-8">
        <div className="row mt-5 mb-5">
        {Jocs.length>0?Jocs.map(
        (Joc)=>{
          return(
            <div key={Joc.id} className="col gap-5 col-lg-4">
              <a href="">
              <img src={`${Joc.portada}`} className="w-100 h-auto" alt="" />
              </a>
              <h4><a href="">{Joc.id} - {Joc.titul}</a></h4>
              <p>{Joc.descripcio}</p>
            </div>
          );
        }
      ):""}
        </div>
      <div className='mb-3'></div>
      </div>
      <div className="col-2"></div>
      </div></div>
  )
}
