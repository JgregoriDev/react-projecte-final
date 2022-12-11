import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from '../../components/Dropdown'
import HeaderAdminResponsive from '../../components/HeaderAdminResponsive';
import useTitle from '../../Hooks/useTitle';
import "../../assets/style/Space.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Usuaris = ({title}) => {
    useTitle(title);

  const [Usuaris, setUsuaris] = useState("");
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      var decoded = jwt_decode(token.token);
      if (!decoded.roles.includes("ROLE_ADMIN")) {
        navigate(`/`);
      }

    }
  }, [])


  useEffect(() => {


    const users = conseguirLlistatUsuaris();
    users.then((result) => {
      if (result) {
        if(result.message==="Expired JWT Token"){
          console.log("pero no entre");
          localStorage.removeItem("token");
          navigate(`/login`);
        }
        const users = result;
        console.log(users);
        setUsuaris(users);
      }
      
    }).catch((err) => {
      console.error(err);
    });
  }, [])

  const conseguirLlistatUsuaris = async () => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token.token}`
    }

    // let response = await fetch("http://vos.es/api/v1/usuaris", {
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}usuaris`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();

    return data;
  }
  return (
    <div className='container-fluid h-75-vh'>
      
    

      <div className="row">
        <div className=" d-lg-block  col-lg-2  my-3">
          <div className='d-none d-lg-block'>
          <div className="d-flex mt-2 w-100 gap-2 flex-column">
            <Dropdown className="d-none d-lg-inline" props="Usuaris" links={{ "Nomlink1": "Llistar usuaris", "ToLink1": "/admin", "Nomlink2": "Afegir usuari", "ToLink2": "/" }}></Dropdown>
            <Dropdown className="d-none d-lg-inline" props="Jocs" links={{ "Nomlink1": "Llistar Jocs", "ToLink1": "/admin/jocs", "Nomlink2": "Afegir Joc", "ToLink2": "/admin/joc/nou" }} ></Dropdown>
            <Dropdown className="d-none d-lg-inline" props="Generes" links={{ "Nomlink1": "Llistar Generes", "ToLink1": "/", "Nomlink2": "Afegir genere", "ToLink2": "/" }}></Dropdown>
            <Dropdown className="d-none d-lg-inline" props="Plataformes" links={{ "Nomlink1": "Llistar Plataformes", "ToLink1": "/", "Nomlink2": "Afegir Plataforma", "ToLink2": "/" }}></Dropdown>
          </div>
          </div>

        </div>
        <div className="col-12 col-lg-8">
        <HeaderAdminResponsive></HeaderAdminResponsive>
        <h1 className="text-center">Administrar Usuaris</h1>
          {/* <Link to={`/admin/jocs`}>Llistar jocs</Link> */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th  className='d-none d-md-table-cell'>id</th>
                <th className='d-table-cell'>Nom</th>
                <th className='d-none d-md-table-cell'>Rol</th>
                <th className='d-table-cell'>Banejat </th>
                <th className='d-table-cell'>Accions</th>
              </tr>
            </thead>
            <tbody>
              {Usuaris && Usuaris.map((usuari, index) => {
                return (
                  <tr key={usuari.id}>
                    <td className='d-none d-md-table-cell'>{index + 1}</td>
                    <td className='d-table-cell'>{usuari.email}</td>
                    <td className='d-none d-md-table-cell'>{usuari.roles.join(", ")}</td>
                    <td className='d-table-cell'>{usuari.ban ? "Si" : "No"}</td>
                    <td className='d-table-cell'>
                      {usuari.email!=="admin"?<Link onClick={(e)=>window.confirm(`Estas segur de ${usuari.ban===false?"banejar":"desbanejar"} l'usuari ${usuari?.email}`)===false? e.preventDefault():""} to={`/usuari/${usuari.id}/ban`}>{usuari.ban ? "Desbanejar" : "Banejar"}</Link>:""}
                    </td>
                  </tr>
                )

              })}
            </tbody>
          </table>
      
        </div>
        <div className="col col-lg-2"></div>
      </div>
    </div>
  )
}

export default Usuaris