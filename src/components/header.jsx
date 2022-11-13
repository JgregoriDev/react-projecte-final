import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/images/icon64x64.png";
import "../assets/style/header.css";
import { Search, Cart, PersonCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export const Header = ({ mostrar, tamanyCarret }) => {
	const [Marques, setMarques] = useState([]);
	useEffect(() => {
		cargarMarques();
		return () => {};
	}, []);
	const cargarMarques = async () => {
		const response = await fetch(`http://vos.es/api/v1/marques`);
		const resultat = await response.json();
		setMarques(resultat);
		
	};
	return (
		<Navbar bg="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/" className="text-white">
					<img className="logo-header" src={Logo} alt="" />
					VOS
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link className="text-white" title="Inici" href="/">
							Inici
						</Nav.Link>
				

						{Marques.length > 1
							? Marques.map((marca) => {
									return (
										<NavDropdown
											key={marca.id}
											title={marca.marca}
											className={`text-white bg-dark ${marca.marcaPlataforma.length>0?"":"d-none"}`}
											// href={`/marca/${marca.id}`}
											id="basic-nav-dropdown"
										>
										{marca?.marcaPlataforma? marca?.marcaPlataforma.map(
												(plataforma)=>{
													return(
														<NavDropdown.Item key={plataforma.id} href={`/plataforma/${plataforma.id}`}>
														{plataforma.plataforma}
													</NavDropdown.Item>
													)
												}
											) :""}
									
										</NavDropdown>
									);
							  })
							: ""}
						<Nav.Link
							title="Buscar"
							onClick={() => {
								mostrar();
							}}
							className="text-white"
							href="#link"
						>
							<Search></Search>
						</Nav.Link>

						<Nav.Link title="Carret" className="text-white" href="/carret">
							{tamanyCarret !== undefined && tamanyCarret > 0
								? `${tamanyCarret}`
								: ``}
							<Cart></Cart>
						</Nav.Link>
						<NavDropdown
							className="text-white d-lg-none"
							title="Usuari"
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item href="/registrar">Registrar</NavDropdown.Item>
							<NavDropdown.Item href="/login">Login</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				{/* Opcio esquerre */}
				<div className="d-none d-lg-flex justify-content-left">
					<PersonCircle className="mx-2 h-auto w-50"></PersonCircle>
					<NavDropdown
						className="text-white"
						title="Usuari"
						id="basic-nav-dropdown"
					>
						<NavDropdown.Item href="/registrar">Registrar</NavDropdown.Item>
						<NavDropdown.Item href="/login">Login</NavDropdown.Item>
					</NavDropdown>
				</div>
			</Container>
		</Navbar>
	);
};
