import React from 'react';
import { Twitter,Facebook,Instagram  } from 'react-bootstrap-icons';
import "../assets/style/footer.css";
import { Link } from "react-router-dom";
export const Peu = () => {

  return (
    <div className='container-fluid bg-dark footer'>
      <div className="row mt-3">
      <div className="col-2"></div>
      <div className="col-8">
        <nav>
          <a href="/sobre-nosotros" className='icon nav-link' title='Sobre nosaltres'>Sobre nosaltres</a>
        </nav>
      </div>
      <div className="col-2 d-flex justify-content-around">
      <a href="https://www.twitter.com" title='Twitter vos' className='icon nav-link' ><Twitter></Twitter></a>
      <a href="https://www.facebook.com" title='Facebook vos' className='icon nav-link' ><Facebook></Facebook></a>
      <a href="https://www.instagram.com" title='Instagram vos' className='icon nav-link' ><Instagram></Instagram></a>
      </div>

      </div>
    </div>
  )
}

