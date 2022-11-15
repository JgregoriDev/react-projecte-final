import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/images/icon64x64.png";
import "../assets/style/header.css";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export const Header = ({ mostrar, tamanyCarret }) => {
	const [Marques, setMarques] = useState([]);
	const [Email, setEmail] = useState("Usuari");
	useEffect(() => {
		cargarMarques();
		if (localStorage.getItem("token")) {
			const email = JSON.parse(localStorage.getItem("token"));
			console.log(email);
			setEmail(email.email);
		}
		return () => {};
	}, []);

	const cargarMarques = async () => {
		const response = await fetch(`http://vos.es/api/v1/marques`);
		const resultat = await response.json();
		setMarques(resultat);
	};
	
	const usuariNoLogin = () => {
		return (
			<>
				<NavDropdown.Item href="/registrar">Registrar</NavDropdown.Item>
				<NavDropdown.Item href="/login">Login</NavDropdown.Item>
			</>
		);
	};
	
	const borrarLS=()=>{
		localStorage.removeItem("token");
		window.location.href="/";
	}
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
											className={`text-white bg-dark mx-03 ${
												marca.marcaPlataforma.length > 0 ? "" : "d-none"
											}`}
											// href={`/marca/${marca.id}`}
											id="basic-nav-dropdown"
										>
											{marca?.marcaPlataforma
												? marca?.marcaPlataforma.map((plataforma) => {
														return (
															<NavDropdown.Item
																key={plataforma.id}
																href={`/plataforma/${plataforma.id}`}
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
								mostrar();
							}}
							className="text-white mx-3"
							href="#link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fillRule="currentColor"
								className="bi bi-search"
								viewBox="0 0 16 16"
							>
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</Nav.Link>

						<Nav.Link title="Carret" className="text-white mx-3" href="/carret">
							{tamanyCarret !== undefined && tamanyCarret > 0
								? `${tamanyCarret}`
								: ``}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fillRule="currentColor"
								className="bi bi-cart"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
							</svg>
						</Nav.Link>

						<NavDropdown
							className="text-white d-lg-none"
							title={Email}
							id="basic-nav-dropdown"
						>
							{Email==="Usuario"?usuariNoLogin():""
						}
							
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				{/* Opcio esquerre */}
				<div className="d-none d-lg-flex justify-content-left">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fillRule="currentColor"
						className="bi bi-person-circle"
						viewBox="0 0 16 16"
					>
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
						<path
							fillRule="evenodd"
							d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
						/>
					</svg>
					<NavDropdown
						className="text-white"
						title={Email}
						id="basic-nav-dropdown"
					>
						{Email==="Usuari"?usuariNoLogin():""}
						{Email!=="Usuari"?<NavDropdown.Item onClick={()=>borrarLS()}>
							Tanca sesió
						</NavDropdown.Item>:""}
					</NavDropdown>
				</div>
			</Container>
		</Navbar>
	);
};
