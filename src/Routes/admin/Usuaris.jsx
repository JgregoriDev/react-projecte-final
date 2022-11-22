import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Usuaris = () => {
  const [Usuaris, setUsuaris] = useState("");
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    console.log();
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
        const users = JSON.parse(result);
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

    let response = await fetch("http://vos.es/api/v1/usuaris", {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();

    return data;
  }
  return (
    <div>
      <h1 className="text-center">Administrar Usuaris</h1>
      <div className="row">
        <div className="col-2">
          <div className="d-flex gap-1 flex-column">
            <div className="btn-group dropend">
              <button type="button" className=" btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                Usuaris
              </button>
              <ul className="dropdown-menu ">
                {/* <!-- Dropdown menu links --> */}
                <li><a className="dropdown-item" href="#">Afegir usuari</a></li>
                <li><a className="dropdown-item" href="#">Llistar Usuaris</a></li>
              </ul>
            </div>
            <div className="btn-group dropend">
              <button type="button" className=" btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                Videojoc
              </button>
              <ul className="dropdown-menu ">
                {/* <!-- Dropdown menu links --> */}
                <li><a className="dropdown-item" href="#">Afegir Videojoc</a></li>
                <li><a className="dropdown-item" href="#">Llistar Videojocs</a></li>
              </ul>
            </div>
            <div className="btn-group dropend">
              <button type="button" className=" btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                Generes
              </button>
              <ul className="dropdown-menu ">
                {/* <!-- Dropdown menu links --> */}
                <li><a className="dropdown-item" href="#">Afegir Geners</a></li>
                <li><a className="dropdown-item" href="#">Llistar Generes</a></li>
              </ul>
            </div>
            <div className="btn-group dropend">
              <button type="button" className=" btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                Marques
              </button>
              <ul className="dropdown-menu ">
                {/* <!-- Dropdown menu links --> */}
                <li><a className="dropdown-item" href="#">Afegir Marques</a></li>
                <li><a className="dropdown-item" href="#">Llistar Marques</a></li>
              </ul>
            </div>

          </div>
        </div>
        <div className="col-8">
        
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Rol</th>
                <th>Banejat </th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {Usuaris && Usuaris.map((usuari, index) => {
                return (
                  <tr key={usuari.id}>
                    <td>{index + 1}</td>
                    <td>{usuari.email}</td>
                    <td>{usuari.roles.join(", ")}</td>
                    <td>{usuari.ban ? "Si" : "No"}</td>
                    <td><Link to={`/usuari/${usuari.id}/ban`}>{usuari.ban ? "Desbanejar" : "Banejar"}</Link></td>
                  </tr>
                )

              })}
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Usuaris