import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./header";
import { Peu } from "./peu";
import SearchBar from "./search";
import About from "../Routes/about";
import Carret from "../Routes/carret";
import Index from "../Routes/index";
import Buscar from "../Routes/buscar";
import Login from '../Routes/login';
import PresentarJoc from "../Routes/presentar-joc";
import Profile from "../Routes/profile";
import {Plataforma} from '../Routes/plataforma';
export const Container = () => {
	const [title, setTitle] = useState("");
	const [showSearchBar, setshowSearchBar] = useState(false);
	const modificarTitul = (title) => {
		setTitle(title);
	};
	const [Carrito, setCarrito] = useState([]);

	const mostrarBarraBusqueda = () => {
		const bandera = showSearchBar;
		setshowSearchBar(!bandera);
	};
	const afegirProducteAlCarret = (producte) => {
		
		console.log(producte);
		const carrito=JSON.parse(localStorage.getItem("carrito"));
		console.log(carrito);
		if(carrito===null){
			// const carritoAux=[];

			localStorage.setItem("carrito",JSON.stringify(producte));
		}else{
			const carritoJSON=JSON.parse(carrito);
			const carritoAux=[...carritoJSON,producte];
			console.log(carritoAux);
			localStorage.setItem("carrito",JSON.stringify(carritoAux));
		}
		// console.log(JSON.parse(localStorage.getItem("carrito")));
	};
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Index afegirProducteAlCarret={afegirProducteAlCarret}></Index>,
		},
		{
			path: "/videojoc/:id",
			element: <PresentarJoc></PresentarJoc>,
		},
		{
			path: "/carret",
			element: <Carret></Carret>,
		},
		{
			path: "/sobre-nosotros",
			element: <About></About>,
		},
		{
			path: "/buscar/",
			element: <Buscar></Buscar>,
		},
		{
			path: "/login/",
			element: <Login></Login>,
		},
		{
			path: "/perfil/",
			element: <Profile></Profile>,
		},
		{
			path: "/plataforma/:id",
			element: <Plataforma></Plataforma>,
		},
	]);

	return (
		<>
			<Header
				mostrar={mostrarBarraBusqueda}
				tamanyCarret={Carrito.lenght}
			></Header>
			<div className="">
						{/* Renderizado de barra de busqueda */}
						{!showSearchBar ? "" : <SearchBar></SearchBar>}
					</div>
			<RouterProvider router={router} />
			<Peu></Peu>
		</>
	);
};
