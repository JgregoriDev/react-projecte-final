import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useTitle from "../Hooks/useTitle";
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../assets/style/badge.css";
import {useNavigate } from 'react-router-dom'

const PresentarJoc = ({ title }) => {
	const navigate= useNavigate('');
	const [Videojoc, setVideojoc] = useState({});
	useTitle(`${title} ${Videojoc.titul ?? ''}`);
	const [Comentaris, setComentaris] = useState([]);
	const [NComentaris, setNComentaris] = useState(0);
	const [Usuari, setUsuari] = useState(null);
	const [Joc, setJoc] = useState(0);
	const [Missatge, setMissatge] = useState('');
	const [errorMissatge,seterrorMissatge]=useState('');
	const [errorVotacio,seterrorVotacio]=useState('');
	const idJoc = window.location.pathname.split("/")[2];
	useEffect(() => {
		getVideojoc();
		conseguirToken();
	}, []);

	const conseguirToken = () => {

		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			setUsuari(token.email);
		}
	};

	const getVideojoc = async () => {
		const link = `http://vos.es/api/v1/videojoc/titol/${idJoc}`;
		const response = await fetch(link);
		const videojocObject = await response.json();
		setVideojoc(videojocObject.Videojoc);

		setNComentaris(videojocObject.NumeroVotacions);
	};

	const getComentaris = async () => {
		const link = `http://vos.es/api/v1/videojoc/${Videojoc.id}/comentaris`;
		const response = await fetch(link);
		const comentarisObject = await response.json();
		setComentaris(comentarisObject);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let valor=false;
		seterrorVotacio("");
		seterrorMissatge("");
		if(e.target[0].value<0 || e.target[0].value.length>5){
			valor=true;
			seterrorVotacio("El valor no pot ser major de 5 ni menor de 0");
		}
		if(e.target[1].value.length<3 || e.target[1].value.length>200){
			valor=true;
			seterrorMissatge("No pot ser menor de 3 ni major de 200 caracters")
			return;
		}
		if(valor){
			return;
		}
		if (localStorage.getItem("token")) {
			const resultat = peticion(e);
			resultat.then((res) => {
				if(res.title){
					setMissatge(res.title);
				}
				if(res.Title){
					setMissatge(res.Title);
					navigate(0);
				}
			})
				.catch(err => console.error(err))
		}
	};

	const peticion = async (e) => {
		const { id, email, token } = JSON.parse(localStorage.getItem("token"));
		console.trace(token);
		let headersList = {
			"Accept": "*/*",
			"Authorization": `"Bearer ${token}`,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			votacio: e.target[0].value,
			missatge: e.target[1].value,
		});

		let response = await fetch(
			`http://vos.es/api/v1/videojoc/${Videojoc.id}/usuari/${id}/comentari/nou`,
			{
				method: "POST",
				body: bodyContent,
				headers: headersList,
			}
		);

		let data = await response.json();
		return data;
	};

	const formComentari = () => {
		return (
			<form onSubmit={(evt) => onSubmit(evt)} method="post">
				<label htmlFor="votacio">Votacio</label>
				<input
					type="number"
					className="form-control my-3"
					placeholder="Votacio"
					name="votacio"
					id="votacio"
				/>
				<small className="text-danger">{errorVotacio}</small>
				<textarea
					className="form-control"
					placeholder="Comenta el videojoc"
					id="floatingTextarea"
				></textarea>
				<small className="text-danger">{errorMissatge}</small>
				<button className="btn btn-primary my-2" type="submit">
					Enviar Comentari
				</button>
				<small className="text-danger">
					{Missatge}
				</small>
			</form>
		);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="d-none d-md-block col-md-2"></div>
				<div className="col col-md-8">
					<h1 className="text-center">
						{Videojoc.id} - {Videojoc.titul}
					</h1>
					<div className="d-flex gap-2 flex-column flex-lg-row">
						<div className="w-100 ">

							<img className="w-100 h-auto" src={`${Videojoc.portada}`} alt="" />


						</div>
						<div className="w-100">
							<p><b>Generes: </b>{Videojoc.generes && Videojoc.generes.map((genere)=>{
								return(
									<span key={genere.id} className="badge rounded-pill  text-bg-primary">
										<Link className="text-white" to={``}>{genere.genere}
										</Link></span>
								)
							})}</p>
							<p>
								<b>Fecha llançament</b>:{" "}
								{new Date(Videojoc.fechaEstreno).toLocaleDateString()}
							</p>
							<p>
								<b>Preu</b>: {Videojoc.preu} €
							</p>
							<p>
								<b>Descripcio</b>: {Videojoc.descripcio}
							</p>
						</div>
					</div>
					<div className="d-flex mt-3 justify-content-center">
						<Button title="Posar en carret " variant="secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-cart"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
							</svg>
						</Button>{" "}
						<Button title="Comprar ya" className="mx-2" variant="primary">
							Comprar ya
						</Button>{" "}
					</div>

					<div className="my-3">{Usuari === null ? "" : formComentari()}</div>
					<div className="my-3">
						<h3>
							{/* <ChatLeft className="mx-3"></ChatLeft> */}
							{NComentaris > 0
								? `Comentaris (${NComentaris})`
								: `No hi han comentaris`}
						</h3>
						<button
							className={`btn btn-primary ${NComentaris === 0 ? "d-none" : ""}`}
							onClick={getComentaris}
						>
							Carregar
						</button>

						{Comentaris &&
							Comentaris.map((comentari) => {
								return (
									<div key={comentari.id}>
										<a href="">{comentari.usuari_votacio.email}</a>
										<p>
											<b>Votacio:</b> {comentari.votacio}{" "}
										</p>
										<p>{comentari.missatge}</p>
									</div>
								);
							})}
					</div>
				</div>
				<div className="d-none d-md-block col-md-2"></div>
			</div>
		</div>
	);
};

export default PresentarJoc;
