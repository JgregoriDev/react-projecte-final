import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { Link, useParams } from "react-router-dom";
import Filter from "../components/Filter";
import FilterPreu from "../components/Filtratge";
import Diapositives from "../components/diapositives";
import SearchBar from '../components/search';
import useTitle from "../Hooks/useTitle";
import Toast from "../components/toast";
import "../assets/style/thumbnails.css";
import BackToTop from "../components/ButtonScrollToTop";
const Index = ({ afegirProducteAlCarret, title }) => {
	useTitle(title);
	const params = useParams("");
	const [Videojocs, setVideojocs] = useState([]);
	
	const [Show, setShow] = useState();
	const [TotalPages, setTotalPages] = useState(1);
	const numero = [];
	const [showGames, setshowGames] = useState(false);

	const search = useLocation().search;
	let page = new URLSearchParams(search).get("pagina") ?? 1;
	let pagina = `?pagina=${page}` ?? ``;
	let filtrar = new URLSearchParams(search).get("filtrar") ?? "preu";
	let filt = `&filtrar=${filtrar}` ?? ``;
	let orden = new URLSearchParams(search).get("orden") ?? "ASC";
	let ord = `&orden=${orden}` ?? "";
	let min = new URLSearchParams(search).get("filtrarMin") ?? '';
	let max = new URLSearchParams(search).get("filtrarMax") ?? '';
	
	useEffect(() => {
		getVideojocsFromServer();
	}, [pagina]);

	useEffect(() => {
		getVideojocsFromServer();
	}, [filtrar, orden])


	const getVideojocsFromServer = async () => {
		page = page <= 0 ? 1 : page;
		let pag = `${parseInt(page)}`;
		let parametro = `&parametro=${filtrar}`;
		let ordenar = `&sort=${orden}`;
		let results = `&results=12`;

		const url = {
			// link1: `http://vos.es/api/v1/videojocs?page=${page}${results}${parametro}${ordenar}`,
			// link1: `http://vos.es/api/v1/video?page=${page}${results}${parametro}${ordenar}`,
			"link1": `https://app.11josep.daw.iesevalorpego.es/api/v1/videojocs?page=${page}${results}${parametro}${ordenar}`,
			// link2: `http:/vos.es/api/v1/videojocs?page=${page}${results}`,
			// link2: `http:/vos.es/api/v1/video?page=${page}${results}`,
			"link2": `https://app.11josep.daw.iesevalorpego.es/api/v1/videojocs?page=${page}${results}`
		};
		let link;
		filtrar && ordenar ? (link = url.link1) : (link = url.link2);

		// const response = await fetch(`http://vos.es/api/v1/videojocs?page=${page}${parametro}${ordenar}`);
		const response = await fetch(link);
		const videojoscArray = await response.json();
		setTotalPages(videojoscArray.Tamany);
		setVideojocs(videojoscArray.Resultat);
	};

	const infiniteSpinner = () => {
		return (
			<div className="text-center">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Carregant jocs...</span>
				</Spinner>
			</div>
		);
	};

	const mostrar = () => {
		setShow(!Show);
		setTimeout(() => {
			setShow(false);
		}, 1500);
	};

	const onSubmit = (e) => {
		console.log(e.target.value);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const afegirAlCarret = (joc) => {
		afegirProducteAlCarret(joc);

	};

	for (let i = 1; i <= TotalPages; i++) {
		numero.push(
			<Link
				key={i}
				className={`page-link ${page === i ? "active" : ""}`}
				onClick={() => scrollToTop()}
				to={{
					pathname: "",
					search: `pagina=${i}${filt}${ord}`,
				}}
			>
				{i}
			</Link>
		);
	}

	return (
		<div>
			{/* Diapositives */}
			<div className="container-fluid">
				
				<div className="row">
					<div className="d-none d-lg-block col-12">
						{page > 1 || page === undefined ? (
							""
						) : (
							<Diapositives></Diapositives>
						)}
					</div>
				</div>
			</div>
			<div className="mt-5 container-fluid">
				<div className="row">
					<div className="d-none d-lg-block col col-lg-2"></div>
					<div className="col col-lg-8">
							{/* Blog de busqueda i filtratge per preu només sera visible en mobil */}
							<div className="d-block d-lg-none">
								<SearchBar width={`w-100`}></SearchBar>
								<FilterPreu width={`w-100`} />
							</div>
								<Filter props={[`/`, orden, filtrar]}></Filter>


							<h1 id="Ancora">Videojocs Pàgina {page}</h1>
							{Videojocs.length < 1 ? infiniteSpinner() : ""}
							<div className="row">
							{Videojocs &&
								Videojocs.map((joc, index) => (
									<div
										className="col-12 col-md-6 border border-1 col-lg-4 justify-content-center border-2 my-3 gap-9"
										key={joc.id}
									>
										<Link className="d-blockw-100 h-auto" to={`/videojoc/${joc.titul}`}>
											<img
												loading="lazy"
												src={joc.portada}
												title={`${joc.titul}`}
												className={`thumbnails`}
												alt=""
											/>
										</Link>
										<h5>
											<Link to={`/videojoc/${joc.titul}`}>
												{joc.titul}
											</Link>
										</h5>
										<p>Preu: {joc.preu}€</p>
										<p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="bi bi-clock"
												viewBox="0 0 16 16"
											>
												<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
												<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
											</svg>
											Fecha Estreno:{" "}
											{new Date(joc.fechaEstreno).toLocaleDateString()}
										</p>
										<div className="d-flex justify-content-around my-2 py-2">
											<Button
												onClick={() => {
													mostrar();
													afegirAlCarret(joc);
												}}
												title="Posar videojoc en  carret"
												variant="secondary"
											>
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
											<form  className={`w-100 ${false?'d-none':''}`} action="http://vos.es/api/v1/pago" method="POST">
											<input type="hidden" name="arrayProductes" value={JSON.stringify({"nom":joc.titul, "preu":joc.preu})} />
											<input type="hidden" name="productes" value={JSON.stringify({"nom":joc.titul, "preu":joc.preu})} />
											<input type="hidden" name="preu" value={joc.preu} />
											<button className="btn btn-primary mx-2" title="Comprar videojoc ja"  type="submit">
												Comprar ja
											</button>
										</form>
										</div>
									</div>
								))}
							{Show ? (
								<Toast message={`Has afegit un producte al carret`}></Toast>
							) : (
								""
							)}
							</div>
							<div className="py-3 d-flex justify-content-center">
								<nav aria-label="Page navigation example">
									<ul className="pagination d-flex m-0">{numero}</ul>
								</nav>
							</div>
						</div>
						<div className="d-none d-lg-flex flex-column col col-lg-2">
						{/* Blog de busqueda i filtratge per preu només sera visible en tamany tablet */}
						<SearchBar width={`w-75`}></SearchBar>
						<FilterPreu width={`w-75`} />
					</div>
					</div>
				</div>
				<BackToTop></BackToTop>
			</div>
	);
};

export default Index;
