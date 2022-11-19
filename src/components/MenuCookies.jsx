import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import "../assets/style/MenuCookies.css";
const MenuCookies = () => {
  const [Show, setShow]=useState(true);
  useEffect(() => {
    const cookies=localStorage.getItem("cookies");
  
    if(cookies){
      
      setShow(cookies);
      // localStorage.setItem("cookies",Show);
    }

    
  

  }, [Show])
  
  const onClick=() =>{
    console.log(Show);
    setShow(false);
    localStorage.setItem("cookies",Show);

  }
  return (
    <>
      <div className={`container-cookies ${Show===true?"":"d-none"}`}>
        <p>  Usem cookies i altres tecnologies essencials per a proporcionar-te els nostres serveis i les funcionalitats del lloc,
       tal com es descriu en el nostre <Link className='d-inline' to="">Avís de cookies</Link>.</p>

        <label className='' onClick={()=>onClick()} title='Cerrar' htmlFor="">x</label>
      </div>
      </>
  )
}

export default MenuCookies