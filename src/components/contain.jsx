import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../assets/images/icon64x64.png";
import {Peu} from "../components/peu";
import About from '../Routes/About';
import Plataforma from '../Routes/Plataforma';
import Buscar from '../Routes/Buscar';
import Carret from '../Routes/Carret';
import Index from '../Routes/Index';
import Login from '../Routes/Login';
import PresentarJoc from '../Routes/Presentar-joc';
import Profile from '../Routes/Profile';
import Notfound from '../Routes/404';
import SearchBar from './search';
import FiltratgePreu from '../Routes/FiltratgePreu';
import FiltrePreu from './Filtratge';
const Contain = () => {
  const [title, setTitle] = useState("");
  const [Usuari, setUsuari] = useState({});
  const [Marques, setMarques] = useState([]);
  const [Email, setEmail] = useState("Login");
  const [showSearchBar, setshowSearchBar] = useState(false);
  const arrayAux = [];
  const [Carrito, setCarrito] = useState([]);
  const [CarritoTamany, setCarritoTamany] = useState(0);
  const modificarTitul = (title) => {
    setTitle(title);
  };
  const mostrarBarraBusqueda = () => {
    const bandera = showSearchBar;
    setshowSearchBar(!bandera);
  };



  const afegirProducteAlCarret = (producte) => {
    //const carrito=JSON.parse(localStorage.getItem("carrito"));
    Carrito.push(producte);
    setCarrito(Carrito);
    localStorage.setItem("carrito", Carrito);
    console.log(Carrito);
  };

  useEffect(() => {
    setCarritoTamany(Carrito.length)
  
  
  }, [Carrito])
  

  useEffect(() => {
    cargarMarques();
    if (localStorage.getItem("token")) {
      const email = JSON.parse(localStorage.getItem("token"));
      console.log(email);
      setEmail(email.email);
    }
    return () => { };
  }, []);

  const cargarMarques = async () => {
    const response = await fetch(`http://vos.es/api/v1/marques`);
    const resultat = await response.json();
    setMarques(resultat);
  };

  const usuariNoLogin = () => {
    return (
      <>
        <NavDropdown.Item as={NavLink} to="/registrar">Registrar</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
      </>
    );
  };

  const borrarLS = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }




  return (
    <div>
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={NavLink} to="/">	<img className="logo-header" src={Logo} alt="" />
                VOS</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/">Inici</Nav.Link>
                  {Marques.length > 1
                    ? Marques.map((marca) => {
                      return (
                        <NavDropdown
                          key={marca.id}
                          title={marca.marca}
                          className={`text-white bg-dark mx-03 ${marca.marcaPlataforma.length > 0 ? "" : "d-none"
                            }`}
                          // href={`/marca/${marca.id}`}
                          id="basic-nav-dropdown"
                        >
                          {marca?.marcaPlataforma
                            ? marca?.marcaPlataforma.map((plataforma) => {
                              return (
                                <NavDropdown.Item
                                  as={NavLink}
                                  key={plataforma.id}
                                  to={`/plataforma/${plataforma.id}`}
                                >
                                  {plataforma.plataforma}
                                </NavDropdown.Item>
                              );
                            })
                            : ""}
                        </NavDropdown>
                      );
                    })
                    : ""}
                  <Nav.Link
                    title="Buscar"
                    onClick={() => {
                      mostrarBarraBusqueda();
                    }}
                    className="text-white mx-3"
                  >
                    <i className="bi bi-search"></i>
                  </Nav.Link>

                  <Nav.Link title="Carret" as={NavLink} className="text-white mx-3" to="/carret">
                    {CarritoTamany > 0
                      ? <small>`${CarritoTamany}`</small>
                      : ``}
                    <i className="bi bi-cart"></i>

                  </Nav.Link>
                </Nav>
                <Nav>
                  <i className="bi mt-1 bi-person-circle text-white"></i>
                  <NavDropdown
                    className="text-white"
                    title={Email}
                    id="basic-nav-dropdown"
                  >
                    {Email === "Login" ? usuariNoLogin() : ""}
                    {Email !== "Login" ? <NavDropdown.Item onClick={() => borrarLS()}>
                      Tanca sesió
                    </NavDropdown.Item> : ""}
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        {!showSearchBar ? "" : <SearchBar></SearchBar>}
        <Routes>
          <Route path='/carret' element={<Carret />}></Route>
          <Route path='/buscar' element={<Buscar />}></Route>
          <Route path='/filtrar/:min/:max' element={<FiltratgePreu />}></Route>
          <Route path='/' element={<Index afegirProducteAlCarret={afegirProducteAlCarret} />}></Route>
          <Route path='/videojoc/:id' element={<PresentarJoc />}></Route>
          <Route path='/sobre-nosotros' element={<About></About>}></Route>
          <Route path='/perfil' element={<Profile Usuari></Profile>}></Route>
          <Route path='/plataforma/:id' element={<Plataforma></Plataforma>}></Route>
          <Route path='/login' element={<Login Usuari></Login>}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </Router>
      <Peu></Peu>
    </div>
  )
}
export default Contain;