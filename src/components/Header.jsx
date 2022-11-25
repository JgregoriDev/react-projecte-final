import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink, Link } from 'react-router-dom'
import Logo from "../assets/images/icon64x64.png";

const Header = ({props}) => {
  const navigate = useNavigate();
  const {CarritoTamany}=props;
  const [Marques, setMarques] = useState([]);
  const [title, setTitle] = useState("");
  const [Email, setEmail] = useState("Login");

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
    // const response = await fetch(`http://app.11josep.daw.iesevalorpego.es/api/v1/marques`);
    const response = await fetch(`http://vos.es/api/v1/marques`);
    const resultat = await response.json();
    setMarques(resultat);
  };



  const borrarLS = () => {
    localStorage.removeItem("token");
    setEmail("Login");
    navigate(`/`);
  }


  const usuariNoLogin = () => {
    return (
      <>
        <NavDropdown.Item as={NavLink} to="/registrar">Registrar</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
      </>
    );
  };
  
  return (
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
                          id="basic-nav-dropdown"
                        >
                          {marca?.marcaPlataforma
                            ? marca?.marcaPlataforma.map((plataforma) => {
                              return (
                                <NavDropdown.Item
                                  as={Link}
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


                  <Nav.Link title="Carret" as={NavLink} className="text-white mx-3" to="/carret">
                    {CarritoTamany > 0
                      ? <small>{CarritoTamany}</small>
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
  )
}

export default Header