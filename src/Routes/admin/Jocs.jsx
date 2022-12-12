import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropdown from '../../components/Dropdown';
import HeaderAdminResponsive from '../../components/HeaderAdminResponsive';
import useTitle from '../../Hooks/useTitle';
import "../../assets/style/Space.css"
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Jocs = ({ title }) => {
  useTitle(title)
  const [Jocs, setJocs] = useState([]);
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    // console.log();
    if (token) {
      var decoded = jwt_decode(token.token);
      console.log();
      if (!decoded.roles.includes("ROLE_ADMIN")) {
        navigate(`/`);
      }

    } else {
      navigate(`/`);

    }

  }, [])


  useEffect(() => {
    conseguirLlistatJocs()
      .then((result) => {
        if (Array.isArray(result.Jocs)) {
          setJocs(result.Jocs);
        }
      }).catch((err) => {
        console.error(err);
      });


  }, [])







  const borrarJoc = (joc) => {
    if (window.confirm("Estas segur de borrar aquest joc?")) {
      console.log(joc);
      const id = Jocs.findIndex((j) => j === joc);
      // if (id > -1) {
      const newJocs = Jocs.filter((j) => {
        return j.id !== joc.id;
      })

      setJocs(newJocs);
      const borrar = borrarPeticioJoc(joc.id);
      borrar.then((result) => {
        if (result.Titol === "Borrat joc de manera satisfactoria") {
          console.log(JSON.parse(result));
          // conseguirLlistatJocs()
        }
      }).catch((err) => {

      });
    }
    // }
  }

  const borrarPeticioJoc = async (id) => {
    token = JSON.parse(localStorage.getItem("token"));
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      'Access-Control-Allow-Origin': true,
      "Content-Type": "application/json"
    }



    // let response = await fetch(`http://vos.es/api/v1/videojoc/${id}/borrar`, {
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/${id}/borrar`, {
      method: "DELETE",
      headers: headersList
    });

    let data = await response.text();
    return data;
  }

  const conseguirLlistatJocs = async () => {
    token = JSON.parse(localStorage.getItem("token"));
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token.token}`
    }

    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}admin/videojocs`, {
      // let response = await fetch("http://vos.es/api/v1/admin/videojocs", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    return data;
    // console.log(data.Jocs);
    // setJocs()
  }
  return (
    <div className='container-fluid h-75-vh'>
      <div className="row">
        <div className="d-none d-lg-block col col-lg-2">
          <div className="d-flex mt-2 w-100 gap-2 flex-column">
            <Dropdown props="Usuaris" links={{ "Nomlink1": "Llistar usuaris", "ToLink1": "/admin", "Nomlink2": "Afegir usuari", "ToLink2": "/" }}></Dropdown>
            <Dropdown props="Jocs" links={{ "Nomlink1": "Llistar Jocs", "ToLink1": "/admin/jocs", "Nomlink2": "Afegir Joc", "ToLink2": "/admin/joc/nou" }} ></Dropdown>
            <Dropdown props="Generes" links={{ "Nomlink1": "Llistar Generes", "ToLink1": "/", "Nomlink2": "Afegir genere", "ToLink2": "/" }}></Dropdown>
            <Dropdown props="Plataformes" links={{ "Nomlink1": "Llistar Plataformes", "ToLink1": "/", "Nomlink2": "Afegir Plataforma", "ToLink2": "/" }}></Dropdown>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <HeaderAdminResponsive></HeaderAdminResponsive>
          <Breadcrumb className='mt-3'>
            <Breadcrumb.Item ><Link to="/">Inici</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>
              Llistar jocs
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className='text-center'>Llista Jocs</h1>
          <div className="text-end">
            <Link to={`/admin/joc/nou`} className="btn btn-primary"><i className="bi bi-plus-circle-fill mx-1"></i><span className="d-none d-lg-inline">Videojoc nou</span></Link>

          </div>
          {/* <Link to={`/admin`}>Llistar usuaris</Link> */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>Joc</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {Jocs && Jocs.map((joc, index) => {
                return (
                  <tr key={joc.id}>
                    <td>{index + 1}</td>
                    <td>{joc.titul}</td>
                    <td className='d-flex flex-column flex-lg-row gap-1'>
                      <button onClick={() => borrarJoc(joc)} className='btn btn-primary ' title={`Borrar ${joc.titul}`}><i className="bi bi-trash-fill"></i></button>
                      <Link className='btn btn-secondary' to={`/admin/joc/${joc.id}/editar`} title={`Editar ${joc.titul}`}><i className="bi bi-pencil-square"></i></Link>
                      <Link className='btn btn-secondary ' to={`/videojoc/${joc.titul}`} title={`Visualitzar ${joc.titul}`}><i className="bi bi-eye"></i></Link>
                    </td>
                  </tr>
                )

              })}
            </tbody>
          </table>
        </div>
        <div className="d-none d-md-block col col-lg-2"></div>
      </div>
    </div>
  )
}

export default Jocs