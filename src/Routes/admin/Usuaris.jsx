import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from '../../components/Dropdown'
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

    // let response = await fetch("http://vos.es/api/v1/usuaris", {
    let response = await fetch("https://app.11josep.daw.iesevalorpego.es/api/v1/usuaris", {
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
        <div className="d-none d-md-block  col-md-2  my-3">
          <div className="d-flex mt-2 w-100 gap-2 flex-column">
            <Dropdown props="Usuaris" links={{ "Nomlink1": "Llistar usuaris", "ToLink1": "/admin", "Nomlink2": "Afegir usuari", "ToLink2": "/" }}></Dropdown>
            <Dropdown props="Jocs" links={{ "Nomlink1": "Llistar Jocs", "ToLink1": "/admin/jocs", "Nomlink2": "Afegir Joc", "ToLink2": "/admin/joc/nou" }} ></Dropdown>
            <Dropdown props="Generes" links={{ "Nomlink1": "Llistar Generes", "ToLink1": "/", "Nomlink2": "Afegir genere", "ToLink2": "/" }}></Dropdown>
            <Dropdown props="Plataformes" links={{ "Nomlink1": "Llistar Plataformes", "ToLink1": "/", "Nomlink2": "Afegir Plataforma", "ToLink2": "/" }}></Dropdown>
          </div>

        </div>
        <div className="col col-md-8">

          {/* <Link to={`/admin/jocs`}>Llistar jocs</Link> */}
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
        <div className="col col-md-2"></div>
      </div>
    </div>
  )
}

export default Usuaris