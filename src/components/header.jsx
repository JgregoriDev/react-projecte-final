import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/images/icon64x64.png';
import "../assets/style/header.css";
import { Search, Cart,PersonCircle} from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { NavLink,Link } from "react-router-dom";

export const Header = ({mostrar,tamanyCarret}) => {
	const [Marques, setMarques] = useState([]);
	useEffect(() => {
		
	
		return () => {
			
		}
	}, [])

	return (
		<Navbar bg="dark" expand="lg" >
			<Container>
				<Navbar.Brand href="/" className='text-white'>
					<img className='logo-header' src={Logo} alt="" />
        VOS</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link className='text-white' title='Inici' href="/">Inici</Nav.Link>
						<Nav.Link className='text-white' href="#link">Link</Nav.Link>
						<Nav.Link title="Buscar" onClick={()=>{mostrar()}} className='text-white' href="#link">
							<Search></Search>
						</Nav.Link>
						<Nav.Link title='Carret' className='text-white' href="/carret">
							{tamanyCarret!==undefined && tamanyCarret>0 ?`${tamanyCarret}`:`` }<Cart></Cart>
						</Nav.Link>
						<NavDropdown className='w-100' title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Dropdown" className='text-white bg-dark' id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						</NavDropdown>
							<NavDropdown className="text-white d-lg-none" title="Usuari" id="basic-nav-dropdown">
							<NavDropdown.Item  href="/registrar">Registrar</NavDropdown.Item>
							<NavDropdown.Item  href="/login">
								Login
							</NavDropdown.Item>
					
						</NavDropdown>
					</Nav>
			<PersonCircle></PersonCircle>
				</Navbar.Collapse>
				{/* Opcio esquerre */}
				<div className="d-none d-lg-flex justify-content-left">
				<NavDropdown className="text-white" title="Usuari" id="basic-nav-dropdown">
							<NavDropdown.Item  href="/registrar">Registrar</NavDropdown.Item>
							<NavDropdown.Item  href="/login">
								Login
							</NavDropdown.Item>
					
						</NavDropdown>
				</div>
			</Container>
		</Navbar>
	);
};
