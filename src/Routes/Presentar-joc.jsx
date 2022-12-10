import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from 'react-router-dom'
import NotFound from "../assets/images/404.png";
import "../assets/style/badge.css";
import useTitle from "../Hooks/useTitle";
import "../assets/style/Space.css";
const PresentarJoc = ({ title }) => {
	const navigate = useNavigate('');
	const [Videojoc, setVideojoc] = useState({});
	const [VideojocTrobat, setVideojocTrobat] = useState("");
	useTitle(`${title} ${Videojoc.titul ?? ''}`);
	const [Comentaris, setComentaris] = useState([]);
	const [NComentaris, setNComentaris] = useState(0);
	const [Carrito, setCarrito] = useState([]);
	const [Usuari, setUsuari] = useState(null);
	const [Missatge, setMissatge] = useState('');
	const [errorMissatge, seterrorMissatge] = useState('');
	const [errorVotacio, seterrorVotacio] = useState('');
	const [] = useState([])
	const idJoc = window.location.pathname.split("/")[2];
	useEffect(() => {
		getVideojoc();
		conseguirToken();
	}, []);

	useEffect(() => {
		const item = localStorage.getItem("carrito");
		if (item) {
			setCarrito(JSON.parse(item));
			// console.log(Carrito);
		}

	}, [])


	const conseguirToken = () => {
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			setUsuari(token.email);
		}
	};

	const getVideojoc = async () => {

		const link = `${process.env.REACT_APP_DOMAIN_API}videojoc/titol/${idJoc}`;
		const response = await fetch(link);
		const videojocObject = await response.json();
		if (videojocObject.Videojoc !== undefined) {
			setVideojocTrobat(true)
			setNComentaris(videojocObject.NumeroVotacions);
			setVideojoc(videojocObject.Videojoc);
		}else{

			setVideojocTrobat(false);
		}

	};

	const getComentaris = async () => {
		// const link = `http://vos.es/api/v1/videojoc/${Videojoc.id}/comentaris`;
		const link = `${process.env.REACT_APP_DOMAIN_API}videojoc/${Videojoc.id}/comentaris`;
		const response = await fetch(link);
		const comentarisObject = await response.json();
		setComentaris(comentarisObject);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let enviar = true;
		seterrorVotacio("");
		seterrorMissatge("");
		const numero = parseInt(e.target[0].value);
		console.log("🚀 ~ file: Presentar-joc.jsx ~ line 69 ~ onSubmit ~ isNaN(numero)", Number.isInteger(numero))
		if (!Number.isInteger(numero)) {
			enviar = false;
			seterrorVotacio("El valor de la votacio no pot ser text");
		}

		if (numero < 0 || numero > 5) {
			enviar = false;
			seterrorVotacio("El valor no pot ser major de 5 ni menor de 0");
		}

		if (e.target[1].value.length < 3 || e.target[1].value.length > 200) {
			enviar = false;
			seterrorMissatge("No pot ser menor de 3 ni major de 200 caracters")
		}

		if (!enviar) {
			return;
		}

		if (localStorage.getItem("token")) {
			const resultat = peticion(e);
			resultat.then((res) => {
				if (res.title) {
					setMissatge(res.title);
				}
				if (res.Title) {
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
			// `http://vos.es/api/v1/videojoc/${Videojoc.id}/usuari/${id}/comentari/nou`,
			`${process.env.REACT_APP_DOMAIN_API}videojoc/${Videojoc.id}/usuari/${id}/comentari/nou`,
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
				<div className="mb-3">
					<label htmlFor="votacio">Votacio</label>
					{/* <input
						type="number"
						className="form-control my-3"
						placeholder="Votacio"
						name="votacio"
						id="votacio"
					/> */}
					<select name="votacio" className="form-control" id="votacio">

						<option default value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div className="mb-3">
					<p><small className="text-danger">{errorVotacio}</small></p>
					<textarea
						className="form-control"
						placeholder="Comenta el videojoc"
						id="floatingTextarea"
					></textarea>
				</div>
				<p>	<small className="text-danger">{errorMissatge}</small></p>
				<button className="btn btn-primary my-2" type="submit">
					Enviar Comentari
				</button>
				<p>	<small className="text-danger">
					{Missatge}
				</small></p>
			</form>
		);
	};

	const onClick = () => {
		Carrito.push(Videojoc);
		setCarrito(Carrito);
		localStorage.setItem('carrito', JSON.stringify(Carrito));
	}

	return (
		<div className="container-fluid h-75-vh">
			<div className="row">
				<div className="d-none d-md-block col-lg-2"></div>
				{VideojocTrobat===""?<>
				<div className="text-center">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Carregant joc...</span>
				</Spinner>
			</div>
				</>:VideojocTrobat ?
					<div className="col-12 col-lg-8">
						<h1 className="text-center">
							{Videojoc.id} - {Videojoc.titul}
						</h1>
						<div className="d-flex gap-2 flex-column flex-lg-row">
							<div className="w-100 ">

								<img className="w-100 h-auto" src={`${Videojoc.portada}`} alt="" />


							</div>
							<div className="w-100">
								<p><b>Generes: </b>{Videojoc.generes && Videojoc.generes.map((genere) => {
									return (
										<span key={genere.id} className="badge rounded-pill ms-2 text-bg-primary">
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
							<Button title="Posar en carret" onClick={() => onClick(Videojoc)} variant="secondary">
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
							<Button title="Comprar ja" className="mx-2" variant="primary">
								Comprar ya
							</Button>{" "}
						</div>

						<div className="my-3">{Usuari === null ? "" : formComentari()}</div>
						<div className="my-3">
							<h3>
								{/* <ChatLeft className="mx-3"></ChatLeft> */}
								{NComentaris > 0
									? `Comentaris (${NComentaris})`
									: (<>
										{`No hi han comentaris`}
										<div className="mb-5">&nbsp;</div>
									</>)}
							</h3>
							<button

								className={`btn btn-primary ${Videojoc === undefined ? "d-none" : ""} ${NComentaris === 0 ? "d-none" : ""}`}
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
					</div> :
					<>
						<div className="col-12 col-lg-8">
							<h1 className="text-danger">Videojoc no trobat</h1>
							<img src={NotFound} alt="" className="w-100 h-auto mb-3" />
						</div>
					</>}
				<div className="d-none d-md-block col-lg-2"></div>
			</div>
		</div>
	);
};

export default PresentarJoc;
